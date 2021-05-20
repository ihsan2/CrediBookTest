import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { NavigationStoreModel } from "../../navigation/navigation-store"
import { UserModel, User } from '../user/user'
import { withEnvironment } from '../extensions/with-environment'


/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  navigationStore: types.optional(NavigationStoreModel, {}),
  users: types.optional(types.array(UserModel), []),
  user: types.maybe(types.reference(UserModel))
}).extend(withEnvironment).actions(self => ({
  setUsers(users: User[]) {
    self.users.replace(users)
  },
  setUser(user) {
    self.user = user
  }
})).actions(self => ({
  async getUsers() {
    try {
      const res = await self.environment.api.getUsers()
      if (res.kind === 'ok') {
        self.setUsers(
          res.users.map(u => ({
            ...u,
            id: u.id.toString(),
          })),
        )
      }
    } catch (e) {
      console.log(e);
    }
  },
  async getUserDetail(userId: string) {
    // await self.environment.api.getUserDetail(userId)
    // try {
    //   const res = await self.environment.api.getUserDetail(userId)
    //   if (res.kind === 'ok') {
    //     self.setUser(
    //       res.user,
    //     )
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
  } 
}))

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
