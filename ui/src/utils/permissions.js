const ROLES = {
  admin: [],
  seller: [],
  customer: [],
};

export function hasPermission(user, permissons) {
  return ROLES(user.role).includes(permissons);
}