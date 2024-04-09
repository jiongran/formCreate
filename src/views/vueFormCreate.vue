<script>
import ElementFormDesignGenerate from '@/components/formDesign/element/elementFormDesignGenerate.vue';
import { defineComponent, reactive, toRefs } from 'vue';
export default defineComponent({
    components: {
        ElementFormDesignGenerate
    },
    setup(props, context) {
        const state = reactive({
            data:{
                "list": [
                    {
                        "label": "多行文本",
                        "type": "textarea",
                        "options": {
                            "width": "100%",
                            "defaultValue": "",
                            "placeholder": "",
                            "maxlength": null,
                            "rows": 4,
                            "autosize": false,
                            "showWordLimit": false,
                            "disabled": false,
                            "clearable": false,
                            "readonly": false,
                            "rules": {
                                "trigger": "blur",
                                "enum": "",
                                "message": "",
                                "pattern": "",
                                "required": false,
                                "type": "any"
                            }
                        },
                        "key": "931e98e5e0504bee82cf19fff986bd97",
                        "model": "textarea_931e98e5e0504bee82cf19fff986bd97",
                        "rules": []
                    },
                    {
                        "label": "单选框组",
                        "type": "radio",
                        "options": {
                            "defaultValue": "",
                            "width": "",
                            "inline": true,
                            "remote": false,
                            "showLabel": false,
                            "remoteFunc": "https://raw.githubusercontent.com/fuchengwei/vue-form-create/master/mock/mock.json",
                            "options": [
                                {
                                    "value": "Option 1",
                                    "label": "Option 1"
                                },
                                {
                                    "value": "Option 2",
                                    "label": "Option 2"
                                },
                                {
                                    "value": "Option 3",
                                    "label": "Option 3"
                                }
                            ],
                            "remoteOptions": [],
                            "props": {
                                "value": "value",
                                "label": "label"
                            },
                            "disabled": false,
                            "rules": {
                                "trigger": "blur",
                                "enum": "",
                                "message": "",
                                "pattern": "",
                                "required": false,
                                "type": "any"
                            }
                        },
                        "key": "c9c307745408438798bacb2aaa193ce7",
                        "model": "radio_c9c307745408438798bacb2aaa193ce7",
                        "rules": []
                    },
                    {
                        "label": "多行文本",
                        "type": "textarea",
                        "options": {
                            "width": "100%",
                            "defaultValue": "",
                            "placeholder": "",
                            "maxlength": null,
                            "rows": 4,
                            "autosize": false,
                            "showWordLimit": false,
                            "disabled": false,
                            "clearable": false,
                            "readonly": false,
                            "rules": {
                                "trigger": "blur",
                                "enum": "",
                                "message": "",
                                "pattern": "",
                                "required": false,
                                "type": "any"
                            }
                        },
                        "key": "5f95bdc5d69349938bf31e49ef41dbb4",
                        "model": "textarea_5f95bdc5d69349938bf31e49ef41dbb4",
                        "rules": []
                    },
                    {
                        "label": "栅格布局",
                        "type": "grid",
                        "columns": [
                            {
                                "span": 12,
                                "list": [
                                    {
                                        "label": "单行文本",
                                        "type": "input",
                                        "options": {
                                            "width": "100%",
                                            "defaultValue": "",
                                            "placeholder": "",
                                            "maxlength": null,
                                            "prefix": "",
                                            "suffix": "",
                                            "prepend": "",
                                            "append": "",
                                            "disabled": false,
                                            "clearable": false,
                                            "readonly": false,
                                            "rules": {
                                                "trigger": "blur",
                                                "enum": "",
                                                "message": "",
                                                "pattern": "",
                                                "required": false,
                                                "type": "any"
                                            }
                                        },
                                        "key": "10d74f41e1614a07a27306ca9cf24312",
                                        "model": "input_10d74f41e1614a07a27306ca9cf24312",
                                        "rules": []
                                    }
                                ]
                            },
                            {
                                "span": 12,
                                "list": [
                                    {
                                        "label": "多选框组",
                                        "type": "checkbox",
                                        "options": {
                                            "defaultValue": [],
                                            "width": "",
                                            "inline": true,
                                            "remote": false,
                                            "showLabel": false,
                                            "remoteFunc": "https://raw.githubusercontent.com/fuchengwei/vue-form-create/master/mock/mock.json",
                                            "options": [
                                                {
                                                    "label": "Option 1",
                                                    "value": "Option 1"
                                                },
                                                {
                                                    "label": "Option 2",
                                                    "value": "Option 2"
                                                },
                                                {
                                                    "label": "Option 3",
                                                    "value": "Option 3"
                                                }
                                            ],
                                            "remoteOptions": [],
                                            "props": {
                                                "value": "value",
                                                "label": "label"
                                            },
                                            "disabled": false,
                                            "rules": {
                                                "trigger": "blur",
                                                "enum": "",
                                                "message": "",
                                                "pattern": "",
                                                "required": false,
                                                "type": "any"
                                            }
                                        },
                                        "key": "274af463ee444549a2ed2920a6f4167d",
                                        "model": "checkbox_274af463ee444549a2ed2920a6f4167d",
                                        "rules": []
                                    }
                                ]
                            }
                        ],
                        "options": {
                            "gutter": 0,
                            "justify": "start",
                            "align": "top"
                        },
                        "key": "711f70016193421aa656dcb97ad40774",
                        "model": "grid_711f70016193421aa656dcb97ad40774",
                        "rules": []
                    }
                ],
                "config": {
                    "size": "default",
                    "hideRequiredAsterisk": false,
                    "labelWidth": 100,
                    "labelPosition": "right"
                }
            }
        })
        return {
            ...toRefs(state),
        }
    }
})
</script>
<template>
    <ElementFormDesignGenerate class="autoHeight" :data="data" ></ElementFormDesignGenerate>
</template>
<style lang="scss" scoped>
.autoHeight {
    height: calc(100vh);
    overflow: hidden;
}
</style>