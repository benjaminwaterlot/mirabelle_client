import { PRODUCTS, DB } from './mongoSetup'

export default async () => {
	return await DB.collection('products').find({}).toArray()
}