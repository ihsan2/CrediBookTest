import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const UserModel = types
  .model("User")
  .props({
    id: types.identifier,
    name: types.string,
    email: types.string,
    avatar: types.string,
    gender: types.string,
    country: types.string,
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    // setId(value: string) {
    //   self.id = value
    // },
    // setName(value: string) {
    //   self.name = value
    // },
    // setEmail(value: string) {
    //   self.email = value
    // },
    // setAvatar(value: string) {
    //   self.avatar = value
    // },
    // setGender(value: string) {
    //   self.gender = value
    // },
    // setCountry(value: string) {
    //   self.country = value
    // },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type UserType = Instance<typeof UserModel>
export interface User extends UserType {}
type UserSnapshotType = SnapshotOut<typeof UserModel>
export interface UserSnapshot extends UserSnapshotType {}
