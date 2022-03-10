import axios from "axios";
import { ref, watch, computed } from "@vue/reactivity";
export const useGetPosts = () => {
  const posts = ref([]);
  const loading = ref(true);

  const count = computed(() => posts.value.length);
  watch(
    () => count,
    async () => {
       const x= await axios.post(
            `http://localhost:4000/Portafolio`,
            {
        idUser: 0,
        Transaction: "FrmPersonasNaturales",
        ExecuteQuery: "ListarPersonasNaturales",
      }
          );
          console.log(" xxxxxxxxxxxxxxxxxx ",x)


      const res = await fetch('https://pablomagaz.com/api/posts');
      const data = await res.json();
      console.log("leo su interior ",data)
      posts.value = data.posts;
      loading.value = false;
    });

  return { count, posts, loading };
};