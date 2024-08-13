import axios from "src/services";

const imageAPI = {
  delete: (id) => {
    const url = `/ProductImage/Delete?Id=${id}`;
    return axios.get(url);
  },
};

export default imageAPI;
