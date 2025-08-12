const ROLES = {
  admin: {
    products: {
      create: true,
      view: true,
      update: true,
      delete: true,
    },
    users: {
      create: true,
      view: true,
      update: true,
      delete: true,
    },
    orders: {
      view: true,
      update: true,
      delete: true,
    },
    categories: {
      create: true,
      view: true,
      update: true,
      delete: true,
    },
  },

  seller: {
    products: {
      create: true,
      view: true, // only their own
      update: true, // only their own
      delete: true, // only their own
    },
    orders: {
      view: true, // orders for their products
      update: true, // like marking shipped
    },
    profile: {
      update: true,
      view: true,
    },
  },

  customer: {
    products: {
      view: true,
    },
    orders: {
      create: true,
      view: true,
      update: true, // for cancel or return
    },
    profile: {
      update: true,
      view: true,
    },
    reviews: {
      create: true,
      update: true,
      delete: true,
    },
  },
};

export function hasPermission(user, permissons) {
  return ROLES(user.role).includes(permissons);
}