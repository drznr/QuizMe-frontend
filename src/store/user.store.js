import { userService } from '@/services/user.service';

export const userStore = {
    state: {
        user: userService.getLoggedUser()
    },
    getters: {
        user(state) {
            return state.user;
        }
    },
    mutations: {
        setUser(state, { user }) {  
            state.user = user;
        }
    },
    actions: {
        async signup(context, { credentials }) {     
            const user = await userService.signup(credentials);
            context.commit({ type: 'setUser', user });
            return user;
        },
        async login(context, { credentials }) {
            const user = await userService.login(credentials);
            context.commit({ type: 'setUser', user });
        },
        async logout(context) {
            await userService.logout();
            context.commit({ type: 'setUser', user: null });
        },
        async updateUser(context, { user }) {
            context.commit({ type: 'setIsProcessing', isProcessing: true });
            const savedUser = await userService.update(user);
            context.commit({ type: 'setUser', user: savedUser });
            context.commit({ type: 'setIsProcessing', isProcessing: false });
            return savedUser;
        }
    }
}