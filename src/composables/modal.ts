import { ref } from "vue"

const modal = () => {
    const showModal = ref(false)

    const toggleModal = (val : boolean) => {
        showModal.value = val
    }
    return {
        showModal,
        toggleModal
    }
}

export default modal