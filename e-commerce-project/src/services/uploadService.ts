import axiosClient from "../api/axiosClient";

const uploadService = {
    uploadImage: async (image: FormData) => {
        console.log(image)
        const response = await axiosClient.post('/upload', image, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    }
}


export default uploadService