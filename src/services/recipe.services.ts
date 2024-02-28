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

const docRef = collection(firestore, COLLECTIONS.RECIPE)

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

        querySnapshot.forEach((doc: DocumentSnapshot<DocumentData>) => {
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

  removeLikedById = async (recipeId: string, userId: string) => {
    const recipeRef = doc(firestore, 'recipes', recipeId)

    try {
      await updateDoc(recipeRef, {
        likedBy: arrayRemove(userId),
      })
      console.log('User ID removed from likedBy array.')
    } catch (error) {
      console.error('Error removing user ID: ', error)
    }
  }
}

const RecipeService = new Recipe()

export { RecipeService }
