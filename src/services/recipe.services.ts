import { COLLECTIONS, getErrorMessage } from '@cookup/constant'
import {
  collection,
  firestore,
  getDownloadURL,
  query,
  ref,
  storage,
  uploadBytes,
} from '@cookup/firebase'
import {
  DocumentData,
  DocumentSnapshot,
  arrayRemove,
  doc,
  getDoc,
  getDocs,
  orderBy,
  updateDoc,
  where,
} from 'firebase/firestore'
import { Api } from './services'

class Recipe {
  getRecipes = async () => {
    return new Promise(async (resolve, reject) => {
      let recipes: any[] = []
      try {
        const querySnapshot = await getDocs(
          query(
            collection(firestore, COLLECTIONS.RECIPE),
            orderBy('createdAt', 'desc')
          )
        )

        const allUsers: any = await Api.user.getUsers()

        querySnapshot.docs.map(async (doc: any) => {
          const data = doc.data() as any

          const recipe = {
            ...doc.data(),
            id: doc.id,
            name: data.name,
            description: data.description,
            image: data.image,
            ingredients: data.ingredients,
            steps: data.steps,
            createdAt: data.createdAt,
            user: allUsers.find((user: any) => user.id === data.userId),
          }
          recipes.push(recipe)
        })
        resolve(recipes)
      } catch (error) {
        console.error('Error getting recipes:', error)
        const errorMessage = getErrorMessage(error)
        reject(errorMessage)
      }
    })
  }

  getRecipe = async (id: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const recipeDoc = await getDocs(
          query(
            collection(firestore, COLLECTIONS.RECIPE),
            where('userId', '==', id)
          )
        )
        if (recipeDoc.empty) {
          resolve([])
        } else {
          const recipeData = recipeDoc.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            }
          })
          resolve(recipeData)
        }
      } catch (error) {
        console.error('Error getting recipe:', error)
        const errorMessage = getErrorMessage(error)
        reject(errorMessage)
      }
    })
  }

  removeLikedById: any = async ({
    recipeId,
    userId,
  }: {
    recipeId: string
    userId: string
  }) => {
    return new Promise(async (resolve, reject) => {
      const recipeRef = doc(firestore, 'recipes', recipeId)

      try {
        await updateDoc(recipeRef, {
          likedBy: arrayRemove(userId),
        })
        resolve('User ID removed from likedBy array.')
      } catch (error) {
        console.error('Error removing user ID: ', error)
        reject(error)
      }
    })
  }

  removeCommentById = async ({
    userId,
    comment,
    recipeId,
  }: {
    userId: string
    comment: string
    recipeId: string
  }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const recipeRef = doc(firestore, 'recipes', recipeId)
        const recipeSnap = await getDoc(recipeRef)
        if (recipeSnap.exists()) {
          const { comments } = recipeSnap.data()

          const commentsToRemove = comments.filter(
            (comment_: any) =>
              comment_.user === userId && comment_.comment === comment
          )

          if (commentsToRemove.length > 0) {
            await Promise.all(
              commentsToRemove.map((comment: any) =>
                updateDoc(recipeRef, {
                  comments: arrayRemove(comment),
                })
              )
            )
            resolve('Comments successfully removed.')
          } else {
            reject('No comments found for the specified user.')
          }
        } else {
          reject('No document found with the given ID.')
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  getUserRecipeLikes = async ({
    userUploadedRecipes,
    recipeId,
  }: {
    recipeId: string
    userUploadedRecipes: any
  }) => {
    return new Promise(async (resolve, reject) => {
      try {
        let userLikes: any = []
        let allUsers: any = await Api.user.getUsers()

        allUsers.map(
          (user: any) =>
            user.id ===
            userUploadedRecipes.map((recipe: any) =>
              recipe.id === recipeId && recipe.likedBy.includes(user.id)
                ? userLikes.push({ ...user, id: recipe.id })
                : []
            )
        )
        resolve(userLikes)
      } catch (error) {
        reject(error)
      }
    })
  }

  getUserRecipeLikesAndComments = async ({
    userUploadedRecipes,
    recipeId,
    singleRecipe,
  }: {
    recipeId: string
    singleRecipe: any
    userUploadedRecipes: any
  }) => {
    return new Promise(async (resolve, reject) => {
      try {
        let userComments: any = []
        let userLikes: any = []

        let allUsers: any = await Api.user.getUsers()

        if (singleRecipe) {
          singleRecipe.likedBy.map((userId: any) => {
            allUsers.map((user: any) => {
              if (user.id === userId) {
                userLikes.push({
                  id: recipeId,
                  userId: user.id,
                  userName: user.name || `${user.firstName} ${user.lastName}`,
                })
              }
            })
          })
        } else {
          allUsers.map(
            (user: any) =>
              user.id ===
              userUploadedRecipes.map((recipe: any) =>
                recipe.id === recipeId && recipe.likedBy.includes(user.id)
                  ? userLikes.push({
                      id: recipe.id,
                      userId: user.id,
                      userName:
                        user.name || `${user.firstName} ${user.lastName}`,
                    })
                  : []
              )
          )

          allUsers.map(
            (user: any) =>
              user.id ===
              userUploadedRecipes.map(
                (recipe: any) =>
                  recipe.id === recipeId &&
                  recipe.comments.map((comment: any) =>
                    comment.user === user.id
                      ? userComments.push({
                          time: '2 pm',
                          id: recipe.id,
                          userId: user.id,
                          comment: comment.comment,
                          userImage: user?.imageUrl || '',
                          totalLikes: recipe.likedBy.length,
                          userName:
                            user.name || `${user.firstName} ${user.lastName}`,
                        })
                      : []
                  )
              )
          )
        }
        resolve({ userComments, userLikes })
      } catch (error) {
        reject(error)
      }
    })
  }
}

const RecipeService = new Recipe()

export { RecipeService }
