<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import HeroBanner from '@/components/HeroBanner.vue'
import SectionHeading from '@/components/SectionHeading.vue';
import StaffEntry from '@/components/StaffEntry.vue';
import TimeLine from '@/components/TimeLine.vue';
import { Splide, SplideSlide } from '@splidejs/vue-splide';

// Import Pinia stores
import { useCarouselStore } from '@/stores/carouselStore';
import { useArticleStore } from '@/stores/articleStore';
import { useStaffStore } from '@/stores/staffStore';

// Initialize Pinia stores
const carouselStore = useCarouselStore();
const articleStore = useArticleStore();
const staffStore = useStaffStore();

// Fetch data when component mounts
onMounted(async () => {
  try {
    // Fetch all data in parallel
    await Promise.all([
      carouselStore.fetchData(),
      articleStore.fetchFeaturedArticles(),
      staffStore.fetchData()
    ]);
  } catch (err) {
    console.error('Error fetching data:', err);
  }
});

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
    <div v-if="carouselStore.isLoading" class="my-4 text-center">
      <p>Loading carousel images...</p>
    </div>
    <div v-else-if="carouselStore.error" class="my-4 text-center text-danger">
      <p>{{ carouselStore.error }}</p>
    </div>
    <Splide 
      v-else
      :options="{ 
        type: 'loop',
        perPage: 4,
        autoplay: false,
        speed: 2000,
        pauseOnFocus: true,
        breakpoints: {
          640: { perPage: 1 },
          768: { perPage: 2 },
          992: { perPage: 3 }
        }
      }" 
      aria-label="Carousel Images"
    >
      <SplideSlide v-for="image in carouselStore.data" :key="image.id">
        <div class="carousel-image-container">
          <img :src="image.src" :alt="image.alt" class="img-fluid">
        </div>
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

      <div v-if="articleStore.isFeaturedLoading" class="col-12 text-center py-4">
        <p>Loading featured articles...</p>
      </div>
      
      <div v-else-if="articleStore.featuredError" class="col-12 text-center py-4 text-danger">
        <p>{{ articleStore.featuredError }}</p>
      </div>
      
      <template v-else>
        <div v-for="article in articleStore.featuredArticles" :key="article.id" class="col-sm-6 mb-4 mb-sm-0">
          <div class="article-card border rounded px-4 py-3" @click="pushBlogRoute(article.id)">
            <article>
              <div class="d-flex align-items-center justify-content-between mb-3">
                <p class="mb-0 h3">{{ article.type }}</p>
                <p><em>{{ new Date(article.publishDate).toLocaleDateString() }}</em></p>
              </div>
              <img :src="article.image" :alt="article.title" class="img-fluid rounded">
              <h3 class="my-3">{{ article.title }}</h3>
              <p>{{ article.preview }}</p>
              <div class="text-end mt-3">
                <RouterLink :to="`/blog/${article.id}`">
                  <em>Keep Reading</em>
                </RouterLink>
              </div>
            </article>
          </div>
        </div>
      </template>

    </div>
  </div>

  <div class="container-lg">
    <SectionHeading 
      heading="Who We Are?"
      sub-heading="Our Team"
      alignment="text-end"
    />
    
    <div v-if="staffStore.isLoading" class="text-center py-4">
      <p>Loading team members...</p>
    </div>
    
    <div v-else-if="staffStore.error" class="text-center py-4 text-danger">
      <p>{{ staffStore.error }}</p>
    </div>
    
    <template v-else>
      <StaffEntry 
        v-for="staff in staffStore.data" 
        :key="staff.id"
        :name="staff.name"
        :title="staff.title"
        :image="staff.image"
        :bio="staff.bio"
        :socials="staff.socials"
      />
    </template>
  </div>

</template>

<style scoped>
.carousel-image-container {
  position: relative;
  overflow: hidden;
}

.carousel-image-container img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: block;
}
</style>
<style lang="scss" scoped>
@import '../assets/scss/variables/colors';

.social-icon {
  height: 40px;
  width: auto;
}
.article-card {
  cursor: pointer !important;
  &:hover {
    animation: shadow-drop-center 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  }
}

@-webkit-keyframes shadow-drop-center {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
  100% {
    box-shadow: 0px 0px 18px 8px rgb(255,255,255);
  }
}
@keyframes shadow-drop-center {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
  100% {
    box-shadow: 0px 0px 18px 8px rgb(255,255,255);
  }
}
</style>