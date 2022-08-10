import { defineStore } from 'pinia'
import type { MajorLocation } from '../../types'
import { useStorage } from '@vueuse/core'

export const majorsData = defineStore({
  id: 'majorsData',

  state: () => ({
    allMajors: useStorage<MajorLocation[]>('allMajors', []),
    alertMsg : ''
  }),

  getters: {},

  actions: {
    showAlert(text : string) {
      this.alertMsg = text
      setTimeout(() => this.alertMsg = '', 5000)
    },

    addNewMajor(course: MajorLocation) {
      this.allMajors.push(course)
    },

    removeMajor(courseIndex: number) {
      this.allMajors.splice(courseIndex, 1)
    },

    moveMajor(fromMajorIndex: number, toMajorIndex: number) {
      const majorList = this.allMajors
      const majorToMove = majorList.splice(fromMajorIndex, 1)[0]
      majorList.splice(toMajorIndex, 0, majorToMove)
    },

    editCourse(newCourse : MajorLocation, courseIndex : number){
      for (let i = 0; i < this.allMajors.length; i++) {
        if(i === courseIndex) this.allMajors[i] = {...newCourse}
      }
    }
  }
})
