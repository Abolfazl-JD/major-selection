<script setup lang="ts">
// stores
import { majorsData } from '../stores/data'
const storeData = majorsData()

const props = defineProps<{
    code: string,
    majorIndex : number
}>()

const emit = defineEmits<{
    (event : 'close-modal') : void
}>()

const deleteCourse = () => {
    storeData.removeMajor(props.majorIndex)
    emit('close-modal')
}
</script>

<template>
    <div 
        @click.self="emit('close-modal')"
	    class="fixed inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div class="relative top-[60px] mx-auto p-5 border  shadow-lg rounded-md bg-white w-3/4 md:w-3/5" >
	      <div>
            <h1 class="text-size-[22px] font-bold">آیا شما واقعا مطمئن هستید که میخواهید این رشته محل با کد {{ code }} را حذف کنید ؟</h1>
            <div class="w-full flex items-center justify-end mt-30px gap-2">
                <button 
                    class="bg-red-500 py-1 px-4 rounded text-white"
                    @click="deleteCourse"
                >
                    حذف
                </button>
                <button 
                    class="bg-blue-500 py-1 px-4 rounded text-white"
                    @click="emit('close-modal')"
                >
                    انصراف
                </button>
            </div>
          </div>
    </div>
  </div>
</template>