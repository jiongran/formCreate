<template>
    <div class="bodyWrap">
        <!-- <div class="inputWrap">
            <el-input v-model="prompt" placeholder="请输入内容" clearable />
        </div>
        <div class="btnWrap" style="width:60px;padding-left: 20px">
            <el-button type="primary" @click="handlerGenerateText">发送</el-button>
        </div>
        <div v-if="generatedText">{{ generatedText }}</div> -->
     </div>
</template>
<script setup>
// import axios from 'axios';
// import { ref } from 'vue';
// const API_KEY = '123456'; // 替换为你的 OpenAI API 密钥

// const openai = axios.create({
//   baseURL: 'https://my-free-chat.vercel.app/v1',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${API_KEY}`
//   }
// });

// const getCompletion = async (prompt) => {
//   try {
//     const response = await openai.post('/index', {
//       prompt,
//       max_tokens: 500 // 你可以根据需求修改生成的文本长度
//     });
//     return response.data.choices[0].text.trim();
//   } catch (error) {
//     console.error('Error fetching completion:', error);
//     return null;
//   }
// };
// const prompt = ref('')
// const generatedText = ref('');
// const handlerGenerateText = async() => {
//     if(prompt.value.trim()==='') return
//     try {
//         const text = await getCompletion(prompt.value);
//         generatedText.value = text
//     } catch (error) {
//         console.log('Error generating text:',error)
//         generatedText.value = 'Error generating text. Please try again.';
//     }
// }

</script>
<style lang="scss" scoped>
.bodyWrap{
    max-width:960px;
    margin: 20px auto;
    display: flex;
    .inputWrap{
        flex: 1;
    }
    .btnWrap{
        width:60px;
        padding-left: 20px;
    }
}
</style>