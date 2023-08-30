export interface Store {
  id: number
  name: string
  userEmail: string
  createdAt: string
}

export interface CategoriesOnProducts {
  productId: number
  categoryId: number
}

export interface Products {
  id: number
  categories: Category[]
  name: string
  price: number
  isFeatured: boolean
  isArchived: boolean
  size: string
  color: string
  images: Image[]
  // orderItems: OrderItem[]
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: number
  name: string
  products: Product[]
  createdAt: string
  updatedAt: string
}

export interface Billboard {
  id: number
  label: string
  imageUrl: string
  createdAt: string
  updatedAt: string
}
