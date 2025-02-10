<script setup>
import { useRouter } from 'vue-router';
import HeroBanner from '@/components/HeroBanner.vue'
import SectionHeading from '@/components/SectionHeading.vue';
import StaffEntry from '@/components/StaffEntry.vue';
import TimeLine from '@/components/TimeLine.vue';
import { Splide, SplideSlide } from '@splidejs/vue-splide';

const router = useRouter();
const pushBlogRoute = (route) => {
  router.push(`/blog/${route}`);
}
</script>

<template>
  <HeroBanner
    heading="LANDING PAGE"
    sub-heading="small landing"
  />
  <div class="container-lg">
    <SectionHeading
      heading="What the fuck is it going to be"
      sub-heading="A game or some shit"
    />

    <div class="mb-4">
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis vitae 
        sunt aut distinctio iste reiciendis, nesciunt, nam eaque impedit voluptate, 
        veritatis aspernatur ipsa dicta ut id minima. Blanditiis, libero! Veniam 
        repudiandae libero adipisci tenetur accusantium iste voluptas nam cum! 
        Nesciunt nulla nemo maxime quo perspiciatis!
      </p>
    </div>

    <div class="mb-4">
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis vitae 
        sunt aut distinctio iste reiciendis, nesciunt, nam eaque impedit voluptate, 
        veritatis aspernatur ipsa dicta ut id minima. Blanditiis, libero! Veniam 
        repudiandae libero adipisci tenetur accusantium iste voluptas nam cum! 
        Nesciunt nulla nemo maxime quo perspiciatis!
      </p>
    </div>
  </div>

  <div class="image-carousel py-5 text-center">
    <Splide :options="{ type:'loop',perPage:4,autoplay:true,speed:2000,pauseOnFocus:true,breakpoints: {640: {perPage: 1,},} }" aria-label="My Favorite Images">
      <SplideSlide>
        <img src="https://picsum.photos/800/400" alt="Sample 2">
      </SplideSlide>
      <SplideSlide>
        <img src="https://picsum.photos/600/400" alt="Sample 1">
      </SplideSlide>
      <SplideSlide>
        <img src="https://picsum.photos/625/400" alt="Sample 2">
      </SplideSlide>
      <SplideSlide>
        <img src="https://picsum.photos/550/400" alt="Sample 2">
      </SplideSlide>
      <SplideSlide>
        <img src="https://picsum.photos/500/400" alt="Sample 2">
      </SplideSlide>
      <SplideSlide>
        <img src="https://picsum.photos/570/400" alt="Sample 2">
      </SplideSlide>
      <SplideSlide>
        <img src="https://picsum.photos/600/400" alt="Sample 1">
      </SplideSlide>
      <SplideSlide>
        <img src="https://picsum.photos/720/400" alt="Sample 2">
      </SplideSlide>
      <SplideSlide>
        <img src="https://picsum.photos/550/400" alt="Sample 2">
      </SplideSlide>
      <SplideSlide>
        <img src="https://picsum.photos/500/400" alt="Sample 2">
      </SplideSlide>
      <SplideSlide>
        <img src="https://picsum.photos/570/400" alt="Sample 2">
      </SplideSlide>
    </Splide>
  </div>

  <TimeLine />

  <div class="container-lg">
    <SectionHeading
      heading="Hey a level 2 Heading"
      sub-heading="Oh Hey some accent text"
    />

    <div class="row">
      <div class="col-sm-4 mb-4 mb-md-0">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a>
          </div>
        </div>
      </div>

      <div class="col-sm-4 mb-4 mb-md-0">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
            <ul class="list-group">
              <li class="list-group-item">An item</li>
              <li class="list-group-item">A second item</li>
              <li class="list-group-item">A third item</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="col-sm-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a>
          </div>
        </div>
      </div>
    </div>

    <div class="section-heading pt-5 my-4">
      <div class="d-flex align-items-end justify-content-between mb-2">
        <div>
          <h2>Maybe this is a blog section</h2>
          <p><em>showcase a few</em></p>
        </div>
        
        <p class="h5">
          <RouterLink to="/blog"><em>Full Blog</em></RouterLink>
        </p>
      </div>
    </div>

    <div class="row">

      <div class="col-sm-6 mb-4 mb-sm-0">
        <div class="border rounded px-4 py-3" @click="pushBlogRoute('articleHome1')">
          <article>
            <div class="d-flex align-items-center justify-content-between mb-3">
              <p class="mb-0 h3">Article Type</p>
              <p><em>PUBLISH DATE</em></p>
            </div>
            <img src="https://picsum.photos/600/250" alt="" class="img-fluid rounded">
            <h3 class="my-3">Subject Lorem ipsum dolor sit amet consectetur.</h3>
            <p>
              Article preview Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Id quae aspernatur eius doloremque, magnam, temporibus voluptatum sapiente, 
              labore rem accusamus deleniti fuga numquam pariatur autem dolorum nulla. 
              Soluta, labore incidunt. Dolorem veniam ullam accusantium voluptatum quas 
              doloribus enim consequuntur eius.
            </p>
            <div class="text-end mt-3">
              <RouterLink to="/blog/articleHome1">
                <em>Keep Reading</em>
              </RouterLink>
            </div>
          </article>
        </div>
      </div>

      <div class="col-sm-6">
        <div class="border rounded px-4 py-3" @click="pushBlogRoute('articleHome2')">
          <article>
            <div class="d-flex align-items-center justify-content-between mb-3">
              <p class="mb-0 h3">Audio Design</p>
              <p><em>PUBLISH DATE</em></p>
            </div>
            <img src="https://picsum.photos/600/250" alt="" class="img-fluid rounded">
            <h3 class="my-3">Subject Lorem ipsum dolor sit amet consectetur.</h3>
            <p>
              Article preview Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Id quae aspernatur eius doloremque, magnam, temporibus voluptatum sapiente, 
              labore rem accusamus deleniti fuga numquam pariatur autem dolorum nulla. 
              Soluta, labore incidunt. Dolorem veniam ullam accusantium voluptatum quas 
              doloribus enim consequuntur eius.
            </p>
            <div class="text-end mt-3">
              <RouterLink to="/blog/articleHome2">
                <em>Keep Reading</em>
              </RouterLink>
            </div>
          </article>
        </div>
      </div>

    </div>
  </div>

  <div class="container-lg">
    <SectionHeading 
      heading="Who We Are?"
      sub-heading="Some Bitches"
      alignment="text-end"
    />
    
    <StaffEntry />
    <StaffEntry />
    <StaffEntry />
    <StaffEntry />
  </div>

</template>
<style lang="scss">
.social-icon {
  height: 40px;
  width: auto;
}
</style>