<script setup lang="ts">
import { reactive, ref } from 'vue'
// components
import DeleteModal from './DeleteModal.vue'
// types
import type { MajorLocation } from '../../types'
// composables
import dragDrop from '../composables/dragDrop'
import modal from '@/composables/Modal'
// store
import { majorsData } from '../stores/data'
const storeData = majorsData()

const props = defineProps<{
    course: MajorLocation,
    majorIndex : number
}>()

// editing the major
const allowEditing = ref(false)
// formdata for editing major
const editingCourse = reactive<MajorLocation>(props.course)
const editMajor = () => {
    if (editingCourse.code) {
        // check if there aren't any majors with the same code
        checkRepeatedCodes()
    }
    else storeData.showAlert('لطفا کد رشته محل را وارد نمایید')
}

const checkRepeatedCodes = () => {
    const foundCourse = searchRepeatedMajor()
    if (!foundCourse) {
        storeData.editCourse(editingCourse, props.majorIndex)
        allowEditing.value = false
    }
    else storeData.showAlert('کد رشته محل تکراری است')
}

const searchRepeatedMajor = () : undefined | MajorLocation => {
    return storeData.allMajors.find((course, i) => {
        if(i !== props.majorIndex && course.code === editingCourse.code) return course
    })
}

const { moveMajor, pickupMajor } = dragDrop()
const { showModal, toggleModal } = modal()
</script>

<template>
    <tr 
        draggable="true"
        @dragover.prevent
        @dragenter.prevent
        @dragstart.self="pickupMajor($event, majorIndex)"
        @drop="moveMajor($event, majorIndex)"
    >
        <td class="body-col w-[13%] !border-r-0">
            {{ majorIndex + 1 }}
        </td>
        <td class="body-col w-[20%]">
            <span v-if="!allowEditing"> {{ course.educationCourse }} </span>
            <input 
                v-else
                type="text" 
                class="input-td"
                v-model="editingCourse.educationCourse"
            >
        </td>
        <td class="body-col w-[15%]">
            <span v-if="!allowEditing"> {{ course.code }} </span>
            <input 
                v-else
                type="text" 
                class="input-td"
                v-model="editingCourse.code"
            >
        </td>
        <td class="body-col w-[20%]">
            <span v-if="!allowEditing">{{ course.major }}</span>
            <input 
                v-else
                type="text" 
                class="input-td"
                v-model="editingCourse.major"
            >
        </td>
        <td class="body-col w-[22%]">
            <span v-if="!allowEditing">{{ course.university }}</span>
            <input 
                v-else
                type="text" 
                class="input-td"
                @keyup.enter="editMajor"
                v-model="editingCourse.university"
            >
        </td>
        <td class="body-col w-[10%]">
            <button 
                v-if="allowEditing"
                class="bg-purple-600 inline-block text-white py-1 px-2 rounded text-size-[14px]"
                @click="editMajor"
            >
                <!-- check icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
            </button>
            <template v-else>
                <button 
                    class="bg-red-500 inline-block text-white py-1 px-2 rounded text-size-[14px]"
                    @click="toggleModal(true)"
                >
                    <!-- delete icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                </button>
                <button 
                    class="bg-green-600 mr-2 inline-block text-white py-1 px-2 rounded text-size-[14px]"
                    @click="allowEditing = true"
                >
                    <!-- edit icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                </button>
            </template>
        </td>
        <DeleteModal 
            v-if="showModal"
            :code="course.code"
            :major-index="majorIndex"
            @close-modal="toggleModal(false)"
        />
    </tr>

</template>