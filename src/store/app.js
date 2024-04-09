import { getItem, setItem } from '@/utils/storage';
import { defineStore } from 'pinia';
const defaultName = 'app'
export const useAppStore = defineStore(defaultName, {
    state: () => {
        const {isLoading,tree} = getItem(defaultName)
        return {
            isLoading: isLoading||undefined,
            tree: tree||0,
        }
    },
    getters: {
    },
    actions: {
        setLoadingVal(value) {
            this.isLoading = value
            setItem(defaultName,this.$state)
        },
        setTreeVal(value) {
            this.tree = value
            setItem(defaultName,this.$state)
        },
    },
})
