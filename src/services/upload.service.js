import axios from 'axios';
import Swal from 'sweetalert2';

const CLOUD_NAME = 'dy31deyp1';
const UPLOAD_PRESET = 'g1gyj9ce';
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;


export const uploadService = {
    uploadImg
}

async function uploadImg(ev) {
    const formData = new FormData();
    formData.append('file', ev.target.files[0])
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
        const res = await axios.post(UPLOAD_URL, formData);
        return res.data;
    } catch (err) {
        Swal.fire({
            title: 'Error!',
            text: 'Oops... looks like an error has ocurred and the proccess has failed, please try again later.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return err;
    }
}