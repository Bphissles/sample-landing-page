<script setup>
import HeroBanner from '@/components/HeroBanner.vue'
import Github from '@/components/icons/social/Github.vue'
import Instagram from '@/components/icons/social/Instagram.vue'
import { Splide, SplideSlide } from '@splidejs/vue-splide';
</script>

<template>
  <HeroBanner/>
  <div class="container-lg">
    
    <div class="section-heading pt-5 my-4">
      <h2>What the fuck is it going to be</h2>
      <p><em>A game or some shit</em></p>
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
    <Splide :options="{ type:'loop',perPage:4,autoplay:true,speed:2000,pauseOnFocus:true,breakpoints: {640: {perPage: 2,},} }" aria-label="My Favorite Images">
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

  <div class="time-line">
    <div class="container-lg text-end">
      <h3>Game Roadmap</h3>
      <div class="my-4 d-md-flex justify-content-between px-5 text-center">
        <div class="border mb-2 mb-md-0 p-3 bg-success-400 rounded-pill">Step 1</div>
        <div class="border mb-2 mb-md-0 p-3 bg-success-400 rounded-pill">Step 2</div>
        <div class="border mb-2 mb-md-0 p-3 rounded-pill">Step 3</div>
        <div class="border mb-2 mb-md-0 p-3 rounded-pill">Step 4</div>
        <div class="border mb-2 mb-md-0 p-3 rounded-pill">Step 5</div>
        <div class="border mb-2 mb-md-0 p-3 rounded-pill">Step 6</div>
      </div>
    </div>
  </div>

  <div class="container-lg">
    <div class="section-heading pt-5 my-4">
      <h2>Hey a level 2 Heading</h2>
      <p><em>Oh Hey some accent text</em></p>
    </div>

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
        
        <p class="h5"><a href=""><em>Full Blog</em></a></p>
      </div>
    </div>

    <div class="row">

      <div class="col-sm-6 mb-4 mb-sm-0">
        <div class="border rounded px-4 py-3">
          <article>
            <div class="d-flex align-items-center justify-content-between mb-3">
              <h3 class="mb-0">Article Type</h3>
              <p><em>PUBLISH DATE</em></p>
            </div>
            <img src="https://picsum.photos/600/250" alt="" class="img-fluid rounded">
            <h4 class="my-3">Subject Lorem ipsum dolor sit amet consectetur.</h4>
            <p>
              Article preview Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Id quae aspernatur eius doloremque, magnam, temporibus voluptatum sapiente, 
              labore rem accusamus deleniti fuga numquam pariatur autem dolorum nulla. 
              Soluta, labore incidunt. Dolorem veniam ullam accusantium voluptatum quas 
              doloribus enim consequuntur eius.
            </p>
            <div class="text-end mt-3">
              <a href="" class=""><em>Keep Reading</em></a>
            </div>
          </article>
        </div>
      </div>

      <div class="col-sm-6">
        <div class="border rounded px-4 py-3">
          <article>
            <div class="d-flex align-items-center justify-content-between mb-3">
              <h3 class="mb-0">Audio Design</h3>
              <p><em>PUBLISH DATE</em></p>
            </div>
            <img src="https://picsum.photos/600/250" alt="" class="img-fluid rounded">
            <h4 class="my-3">Subject Lorem ipsum dolor sit amet consectetur.</h4>
            <p>
              Article preview Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Id quae aspernatur eius doloremque, magnam, temporibus voluptatum sapiente, 
              labore rem accusamus deleniti fuga numquam pariatur autem dolorum nulla. 
              Soluta, labore incidunt. Dolorem veniam ullam accusantium voluptatum quas 
              doloribus enim consequuntur eius.
            </p>
            <div class="text-end mt-3">
              <a href="" class=""><em>Keep Reading</em></a>
            </div>
          </article>
        </div>
      </div>

    </div>
  </div>

  <div class="container-lg">
    <div class="section-heading pt-5 my-4 text-end">
      <h2>Who We Are?</h2>
      <p><em>Some Bitches</em></p>
    </div>
    <hr>
    <div class="person-card d-md-flex gap-3 align-items-center mb-4">
      <div class="text-center">
        <img src="https://picsum.photos/150" alt="" class="rounded-circle">
      </div>
      <div class="details">
        <p><strong><em>Name</em></strong> Title</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, iure itaque? Qui rem voluptatibus aliquid debitis excepturi laborum fugit ipsa hic corporis facilis, nisi et quidem iste id dolorum ex, praesentium eaque sit aperiam incidunt?</p>
        <div class="socials d-flex mt-2">
          <div class="social-icon d-flex gap-3">
            <Github />
            <Instagram />
          </div>
        </div>
      </div>
    </div>
    <hr>
    <div class="person-card d-md-flex gap-3 align-items-center mb-4">
      <div class="text-center">
        <img src="https://picsum.photos/150" alt="" class="rounded-circle">
      </div>
      <div class="details">
        <p><strong><em>Name</em></strong> Title</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, iure itaque? Qui rem voluptatibus aliquid debitis excepturi laborum fugit ipsa hic corporis facilis, nisi et quidem iste id dolorum ex, praesentium eaque sit aperiam incidunt?</p>
        <div class="socials d-flex mt-2">
          <div class="social-icon d-flex gap-3">
            <Github />
            <Instagram />
          </div>
        </div>
      </div>
    </div>
    <hr>
    <div class="person-card d-md-flex gap-3 align-items-center mb-4">
      <div class="text-center">
        <img src="https://picsum.photos/150" alt="" class="rounded-circle">
      </div>
      <div class="details">
        <p><strong><em>Name</em></strong> Title</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, iure itaque? Qui rem voluptatibus aliquid debitis excepturi laborum fugit ipsa hic corporis facilis, nisi et quidem iste id dolorum ex, praesentium eaque sit aperiam incidunt?</p>
        <div class="socials d-flex mt-2">
          <div class="social-icon d-flex gap-3">
            <Github />
            <Instagram />
          </div>
        </div>
      </div>
    </div>
    <hr>
  </div>

</template>
<style lang="scss">
.social-icon {
  height: 40px;
  width: auto;
}
</style>