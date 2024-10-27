<script setup lang="ts">
import { ref } from 'vue';
import Uploader from 'vue-media-upload'

interface Props {
    modelValue?: string[],
    maxUploads?: number
}
const props = withDefaults(defineProps<Props>(), {
    modelValue: () => [],
    maxUploads: 0
})

const convertStringToMedia = (str: string[]): any => {
    return str.map((element:string) => {
        return {name: element};
    })
}
const emit = defineEmits(['update:modelValue'])
const ConvertMediaToString = (media: any): string[] => {
    const output: string[] = [];
    media.forEach((element: any) => {
        output.push(element.name)
    })
    return output
}
const media = ref(convertStringToMedia(props.modelValue))
const uploadUrl = ref(import.meta.env.VITE_UPLOAD_URL)
const onChange = (files: any) => {
    if (props.maxUploads && files.length > props.maxUploads) {
        // Limit the files to maxUploads if set
        files = files.slice(0, props.maxUploads);
    }
    emit('update:modelValue', ConvertMediaToString(files));
};
</script>
<template>
    <Uploader :server="uploadUrl" @change="onChange" :media="media"></Uploader>
</template>