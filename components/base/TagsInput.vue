<script setup>
const tags = ref('')

const props = defineProps({
    label: {
        type: String,
        default: 'Tags',
    },
    modelValue: {
        type: Array,
        default: [],
    },
    inputType: {
        type: String,
        default: 'text',
    },
    isFilterView: {
        type: Boolean,
        default: false,
    },
})
const addTag = () => {
    if (!tags.value) {
        return
    }
    props.modelValue.push(tags.value)
    tags.value = ''
}
const removeTag = (index) => {
    if (props.isFilterView) {
        return
    }
    props.modelValue.splice(index, 1)
}
</script>

<template>
    <u-form-group :label="$t(props.label)">
        <u-input
            v-if="!props.isFilterView"
            v-model="tags"
            class="form-control appearance-none"
            size="lg"
            :type="inputType"
            @keyup.enter="addTag"
        >
            <template #trailing>
                <UKbd>
                    <icon name="streamline:computer-keyboard-return-1-keyboard-arrow-return-enter" />
                </UKbd>
            </template>
        </u-input>
        <div class="tags flex flex-wrap py-1 gap-1">
            <u-button
                v-for="(tag, index) in props.modelValue"
                :key="index"
                class="tag"
                color="white"
                size="xs"
                :trailing-icon="props.isFilterView ? '' : 'i-solar-trash-bin-trash-outline'"
                @click="removeTag(index)"
            >
                <span class="max-w-[150px] truncate">{{ tag }}</span>
            </u-button>
        </div>
    </u-form-group>
</template>

<style scoped></style>
