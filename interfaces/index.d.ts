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
  createdAt: string
}

export interface Color {
  id: number
  name: string
  value: string
  createdAt: string
}

export interface Size {
  id: number
  name: string
  value: string
  createdAt: string
}

export interface Billboard {
  id: number
  store: Store
  category: Category
  label: string
  imageUrl: string
}
