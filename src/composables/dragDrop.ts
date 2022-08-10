import { majorsData } from '../stores/data'

const dragDrop = () => {
    
    const storeData = majorsData()

    const pickupMajor = (e: DragEvent, majorIndex : number) => {
        if(e.dataTransfer){
          e.dataTransfer.effectAllowed = 'move'
          e.dataTransfer.dropEffect = 'move'
          e.dataTransfer.setData('from-major-index', String(majorIndex))
        }
    }

    const moveMajor = (e: DragEvent, toMajorIndex: number) => {
        const fromMajorIndex = e.dataTransfer?.getData('from-major-index')
        storeData.moveMajor(Number(fromMajorIndex), toMajorIndex)
    }

    return {
        pickupMajor,
        moveMajor
    }
}

export default dragDrop