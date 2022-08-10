<script setup lang="ts">
import { reactive, ref } from 'vue'
// components
import MajorCourse from './components/MajorCourse.vue'
// stores
import { majorsData } from './stores/data'
const storeData = majorsData()

const showNewMajor = ref(false)
const fistInp = ref<HTMLInputElement | null>(null)

const enableAddingMajor = () => {
  showNewMajor.value = true
  // focus on first form input
  setTimeout(() => {
      fistInp.value?.focus()
  }, 100)
}

const newCourse = reactive({
  educationCourse: '',
  code: '',
  major: '',
  university : ''
})

const addNewMajor = () => {
  if (newCourse.code) {
    // check if there aren't any major with this code
    checkRepeatedCourse()
  }
  else storeData.showAlert('لطفا کد رشته محل را وارد کنید')
}

const checkRepeatedCourse = () => {
  const foundCourse = storeData.allMajors.find(course => course.code === newCourse.code)
  if (!foundCourse) {
    confirmAdding()
  }
  else storeData.showAlert('کد رشته محل تکراری است')
}

const confirmAdding = () => {
  const addCourse = {...newCourse}
  storeData.addNewMajor(addCourse)
  // reset form
  newCourse.educationCourse = ''
  newCourse.code = ''
  newCourse.major = ''
  newCourse.university = ''
  // close new major form
  showNewMajor.value = false
}

</script>

<template>
  <div class="limiter w-[1366px] my-0 mx-auto">
    <div class="w-full h-screen bg-white flex justify-center flex-wrap py-33px px-30px">
      <div class="w-[1170px]">
        <div class="overflow-hidden relative pt-60px bg-white border-[3px] border-solid border-black">
          <div class="absolute w-full top-0 left-0">
            <table class="w-full border-collapse">
              <thead>
                <tr>
                  <th class="head-row w-[13%] !border-none">ردیف</th>
                  <th class="head-row w-[20%]">دوره تحصیلی</th>
                  <th class="head-row w-[15%]">کد رشته محل</th>
                  <th class="head-row w-[20%]">نام رشته گرایش</th>
                  <th class="head-row w-[22%]">نام دانشگاه یا موسسه</th>
                  <th class="head-row w-[10%]">عملیات</th>
                </tr>
              </thead>
            </table>
          </div>
          <div class="relative">
            <table class="w-full border-collapse">
              <tbody>
                <MajorCourse 
                  v-for="(course, index) in storeData.allMajors" 
                  :key="index"
                  :course="course"
                  :major-index="index"
                />
                <!-- row for creating a new major -->
                <tr v-if="showNewMajor">
                  <td class="body-col w-[13%] !border-r-0">
                    {{ storeData.allMajors.length + 1 }}
                  </td>
                  <td class="body-col w-[20%]">
                    <input 
                      ref="fistInp"
                      type="text" 
                      class="input-td"
                      v-model="newCourse.educationCourse"
                    >
                  </td>
                  <td class="body-col w-[15%]">
                    <input 
                      type="text" 
                      class="input-td"
                      v-model="newCourse.code"
                    >
                  </td>
                  <td class="body-col w-[20%]">
                    <input 
                      type="text" 
                      class="input-td"
                      v-model="newCourse.major"
                    >
                  </td>
                  <td class="body-col w-[22%]">
                    <input 
                      type="text" 
                      class="input-td"
                      v-model="newCourse.university"
                    >
                  </td>
                  <td class="body-col w-[10%]">
                    <button 
                      class="bg-red-500 text-white py-1 px-2 rounded text-size-[14px] inline-block"
                      @click="showNewMajor = false"
                    >
                      <!-- delete icon -->
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                      </svg>
                    </button>
                    <button 
                      class="inline-block duration-300 ease hover:bg-sky-700 mr-2 transition-all bg-sky-600 py-1 px-2 text-white rounded"
                      @click="addNewMajor"
                    >
                      <!-- add icon -->
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="flex items-end justify-center h-[7.5rem] relative">
        <!-- error message -->
          <p class="mt-5 text-size-[20px] top-0 font-bold text-red-600 block mx-auto text-center left-auto absolute">
            {{ storeData.alertMsg }}
          </p>
          <button 
            class="block mx-auto duration-300 ease disabled:bg-opacity-50 disabled:cursor-not-allowed hover:bg-sky-700 transition-all bg-sky-600 py-1 px-3 text-white rounded"
            @click="enableAddingMajor"
            :disabled="showNewMajor"
          >
            افزودن ردیف جدید
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.head-row{
    font-size: 18px;
    color: #000;
    line-height: 1.4;
    background-color: rgba(0, 0, 0, 0.114);
    border-right: 2px solid black;
    padding-top: 18px;
    padding-bottom: 18px;
    font-weight: unset;
    padding-right: 10px;
    text-align: center;
}

.body-col {
    font-size: 15px;
    color: rgb(63, 63, 63);
    line-height: 1.4;
    padding-top: 4px;
    padding-bottom: 3px;
    padding-right: 10px;
    text-align: center;
    border: 2px solid black;
    border-left: none;
    border-bottom: none;
}
</style>

