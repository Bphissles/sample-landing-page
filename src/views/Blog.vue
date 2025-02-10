<script setup>
import HeroBanner from '@/components/HeroBanner.vue';
import SectionHeading from '@/components/SectionHeading.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const pushBlogRoute = (route) => {
  router.push(`/blog/${route}`);
}
</script>

<template>
  <HeroBanner
    heading="BLOG PAGE"
    sub-heading="small Blog"
  />
  
  <div class="container-lg">
    <SectionHeading 
      heading="Them Posts"
      sub-heading="About the Stuff"
      alignment="text-start"
    />

    <article class="article-card pb-4" @click="pushBlogRoute('article1')">
      <div class="border rounded d-block d-md-flex p-4 gap-4">
        <div class="image">
          <img src="https://picsum.photos/400/250" alt="" class="rounded img-fluid">
        </div>
        <div class="article-content w-100">
          <div class="d-flex align-items-start justify-content-between gap-3">
            
            <div class="title">
              <h3>article Title</h3>
              <p><em>PUBLISH DATE</em></p>
            </div>
            
            <div class="tags text-end">
              <span class="badge text-bg-secondary text-white">Game Play</span><br>
              <span class="badge text-bg-success text-white">Progress</span><br>
              <span class="badge text-bg-primary">Audio</span>
            </div>

          </div>

          <hr>

          <div class="article-preview">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab dignissimos, voluptatem doloremque odit commodi, fugiat laborum vitae id consectetur perferendis, eius omnis placeat saepe quisquam eligendi sed. Culpa dicta necessitatibus ad odio nobis perferendis accusantium sint corporis nam quibusdam, quisquam velit saepe rerum? Iure tenetur, ipsum accusantium numquam repellat corporis.</p>
          </div>

        </div>
      </div>
    </article>

    <article class="article-card pb-4" @click="pushBlogRoute('article2')">
      <div class="border rounded d-block d-md-flex p-4 gap-4">
        <div class="image">
          <img src="https://picsum.photos/400/250" alt="" class="rounded img-fluid">
        </div>
        <div class="article-content w-100">
          <div class="d-flex align-items-start justify-content-between gap-3">
            
            <div class="title">
              <h3>article Title Lorem ipsum dolor sit amet consectetur adipisicing elit</h3>
              <p><em>PUBLISH DATE</em></p>
            </div>
            
            <div class="tags text-end">
              <span class="badge text-bg-warning text-white">Behind the Scenes</span><br>
              <span class="badge text-bg-secondary text-white">Game Play</span>
            </div>

          </div>

          <hr>

          <div class="article-preview">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab dignissimos, voluptatem doloremque odit commodi, fugiat laborum vitae id consectetur perferendis, eius omnis placeat saepe quisquam eligendi sed. Culpa dicta necessitatibus ad odio nobis perferendis accusantium sint corporis nam quibusdam, quisquam velit saepe rerum? Iure tenetur, ipsum accusantium numquam repellat corporis.</p>
          </div>

        </div>
      </div>
    </article>

    <article class="article-card pb-4" @click="pushBlogRoute('article3')">
      <div class="border rounded d-block d-md-flex p-4 gap-4">
        <div class="image">
          <img src="https://picsum.photos/400/250" alt="" class="rounded img-fluid">
        </div>
        <div class="article-content w-100">
          <div class="d-flex align-items-start justify-content-between gap-3">
            
            <div class="title">
              <h3>article Title</h3>
              <p><em>PUBLISH DATE</em></p>
            </div>
            
            <div class="tags text-end">
              <span class="badge text-bg-success text-white">Progress</span><br>
              <span class="badge text-bg-primary">Audio</span>
            </div>

          </div>

          <hr>

          <div class="article-preview">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab dignissimos, voluptatem doloremque odit commodi, fugiat laborum vitae id consectetur perferendis, eius omnis placeat saepe quisquam eligendi sed. Culpa dicta necessitatibus ad odio nobis perferendis accusantium sint corporis nam quibusdam, quisquam velit saepe rerum? Iure tenetur, ipsum accusantium numquam repellat corporis.</p>
          </div>

        </div>
      </div>
    </article>
  </div>
</template>
<style lang="scss" scoped>
.article-card {
  cursor: pointer;
}
</style>