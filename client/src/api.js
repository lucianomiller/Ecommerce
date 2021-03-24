import axios from "axios";

// ---------- Llamados axios a la base de datos para las acciones de categoryActions --------

export const postCategory = (category) => {
  return axios.post(`http://localhost:3001/products/category`, {
    ...category,
  });
};

export const getCategories = () => {
  return axios.get(`http://localhost:3001/products/category`);
};
export const getCategory = (id) => {
  return axios.get(`http://localhost:3001/categories/edit/${id}`);
};
export const deleteCategory = (id) => {
  return axios.delete(`http://localhost:3001/products/category/${id}`);
};
export const putCategory = (data) => {
  return axios.put(`http://localhost:3001/products/category/${data.id}`, data);
};

// ---------- Llamados axios a la base de datos para las acciones de productsActions --------

export const getNewestProducts = (amount) => {
  return axios.get(`http://localhost:3001/products/newest?limit=${amount}`);
};

export const searchProducts = (params) => {
  return axios.get(`http://localhost:3001/products/search${params || ""}`);
};

export const getByCategory = (categorie) => {
  return axios.get(`http://localhost:3001/categories/${categorie}`);
};

export const postProduct = (data) => {
  return axios.post(`http://localhost:3001/products/`, data, {
    withCredentials: true,
  });
};

export const getProducts = () => {
  return axios.get(`http://localhost:3001/products/`);
};

export const deleteProduct = (id) => {
  return axios.delete(`http://localhost:3001/products/${id}`);
};

export const putProduct = (data) => {
  return axios.put(`http://localhost:3001/products/${data.id}`, {
    name: data.product.nombre,
    description: data.product.descripcion,
    stock: data.product.stock,
    price: data.product.precio,
  });
};

export const hasBoughtProduct = (productId) => {
  return axios.get(`http://localhost:3001/products/hasBought/${productId}`, {
    withCredentials: true,
  });
};

// ---------- Llamados axios a la base de datos para las acciones de usersActions --------

export const postUser = (data) => {
  return axios.post(`http://localhost:3001/user/register`, data);
};

export const getUsers = () => {
  return axios.get(`http://localhost:3001/user/`);
};

export const getLogout = () => {
  return axios.get(`http://localhost:3001/user/logout/`, {
    withCredentials: true,
  });
};

export const putResetPassword = (data) => {
  return axios.put(
    `http://localhost:3001/user?username=${data.userName}`,
    {
      // email: data.email,
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    },
    {
      withCredentials: true,
    }
  );
};
export const putPromoveAdmin = (data) => {
  //console.log(data)
  return axios.put(
    `http://localhost:3001/user/${data.id}`,
    {
      role: data.role,
      banned: data.banned,
      changePass: data.changePass,
    },
    {
      withCredentials: true,
    }
  );
};

export const putBannedUser = (data) => {
  return axios.put(
    `http://localhost:3001/user/${data.id}`,
    {
      banned: data.banned,
    },
    {
      withCredentials: true,
    }
  );
};

export const putForceResetUserPass = (data) => {
  return axios.put(
    `http://localhost:3001/user/${data.id}`,
    {
      changePass: data.changePass,
    },
    {
      withCredentials: true,
    }
  );
};

export const putUser = (data) => {
  return axios.put(`http://localhost:3001/user/${data.id}`, {
    firstName: data.firstName,
    lastName: data.lastName,
    userName: data.userName,
    email: data.email,
  });
};

// ---------- Llamados axios a la base de datos para las acciones de usersActions --------
export const getOrden = () => {
  return axios.get(`http://localhost:3001/orden/`);
};

export const myOrden = () => {
  return axios.get(`http://localhost:3001/orden/myorden`, {
    withCredentials: true,
  });
};

export const changeOrden = (idUsuario, estado) => {
  return axios.put(`http://localhost:3001/carrito/${idUsuario}`, estado, {
    withCredentials: true,
  });
};

// --------- reviews -------------

export const postReview = (productId, reviewData) => {
  return axios.post(
    `http://localhost:3001/products/${productId}/review`,
    reviewData,
    {
      withCredentials: true,
    }
  );
};

export const getProductReviews = (productId) => {
  return axios.get(`http://localhost:3001/products/${productId}/review`);
};

export const getAllReviews = () => {
  return axios.get(`http://localhost:3001/products/review`);
};

export const editProductReview = (reviewId, reviewData) => {
  return axios.put(
    `http://localhost:3001/products/review/${reviewId}`,
    reviewData,
    { withCredentials: true }
  );
};

export const deleteProductReview = (productId, reviewId) => {
  return axios.delete(
    `http://localhost:3001/products/${productId}/review/${reviewId}`,
    { withCredentials: true }
  );
};

// --------- carrito -------------

export const postNewItemToCart = (productId, userId) => {
  return axios.post(
    `http://localhost:3001/carrito/${userId}`,
    { productId },
    {
      withCredentials: true,
    }
  );
};

export const fetchCartItems = (userId) => {
  return axios.get(`http://localhost:3001/carrito/${userId}`, {
    withCredentials: true,
  });
};

export const deleteCartItems = (userId) => {
  return axios.delete(`http://localhost:3001/carrito/${userId}`, {
    withCredentials: true,
  });
};

export const deleteCartItem = (userId, productId) => {
  return axios.delete(`http://localhost:3001/carrito/${userId}/${productId}`, {
    withCredentials: true,
  });
};

export const postAddOneToCartItem = (userId, productId) => {
  return axios.post(`http://localhost:3001/carrito/${userId}/${productId}`, {
    withCredentials: true,
  });
};

export const deleteRemoveOneCartItemAmount = (userId, productId) => {
  return axios.delete(
    `http://localhost:3001/carrito/${userId}/oneAmount/${productId}`,
    {
      withCredentials: true,
    }
  );
};

export const putOneCartItemAmount = ({ userId, productId, cantidad }) => {
  return axios.put(
    `http://localhost:3001/carrito/${userId}/${productId}`,
    { cantidad },
    {
      withCredentials: true,
    }
  );
};

export const mergeLocalCartWithDB = (userId, cartData) => {
  return axios.put(`http://localhost:3001/carrito/${userId}/merge`, cartData, {
    withCredentials: true,
  });
};

export const mercadoPago = (data) => {
  return axios.post(`http://localhost:3001/checkout`, data);
};

//-----Google login --------

export const getGoogleLogin = () => {
  return axios.get("http://localhost:3001/auth", { withCredentials: true });
};
