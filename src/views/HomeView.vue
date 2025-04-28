<script setup>
import { onMounted } from 'vue';
import HeroBanner from '@/components/HeroBanner.vue';
import SectionHeading from '@/components/SectionHeading.vue';
import ArticlePreview from '@/components/ArticlePreview.vue';
import CardItem from '@/components/CardItem.vue';
import StaffEntry from '@/components/StaffEntry.vue';
import TimeLine from '@/components/TimeLine.vue';
import { useRouter } from 'vue-router';
import { Splide, SplideSlide } from '@splidejs/vue-splide';

// Import Pinia stores
import { useCarouselStore } from '@/stores/carouselStore';
import { useArticleStore } from '@/stores/articleStore';
import { useStaffStore } from '@/stores/staffStore';
import { useCardStore } from '@/stores/cardStore';

// Initialize Pinia stores
const carouselStore = useCarouselStore();
const articleStore = useArticleStore();
const staffStore = useStaffStore();
const cardStore = useCardStore();

// Fetch data when component mounts
onMounted(async () => {
  try {
    // Fetch all data in parallel
    await Promise.all([
      carouselStore.fetchData(),
      articleStore.fetchFeaturedArticles(),
      staffStore.fetchData(),
      cardStore.fetchAllCards()
    ]);
  } catch (err) {
    console.error('Error fetching data:', err);
  }
});

const router = useRouter();
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

    <!-- Card loading state -->
    <div v-if="cardStore.isLoading" class="text-center py-4">
      <p>Loading cards...</p>
    </div>
    
    <!-- Card error state -->
    <div v-else-if="cardStore.error" class="text-center py-4 text-danger">
      <p>{{ cardStore.error }}</p>
    </div>
    
    <!-- Cards content -->
    <div v-else class="row">
      <div 
        v-for="card in cardStore.allCards" 
        :key="card.id" 
        class="col-sm-4 mb-4 mb-md-0"
      >
        <CardItem :card="card" />
      </div>
    </div>

    <SectionHeading
      heading="Maybe this is a blog section"
      sub-heading="showcase a few"
    >
      <template #action>
        <p class="h5">
          <RouterLink to="/blog"><em>Full Blog</em></RouterLink>
        </p>
      </template>
    </SectionHeading>

    <div class="row">

      <div v-if="articleStore.isFeaturedLoading" class="col-12 text-center py-4">
        <p>Loading featured articles...</p>
      </div>
      
      <div v-else-if="articleStore.featuredError" class="col-12 text-center py-4 text-danger">
        <p>{{ articleStore.featuredError }}</p>
      </div>
      
      <template v-else>
        <div v-for="article in articleStore.featuredArticles" :key="article.id" class="col-sm-6 mb-4 mb-sm-0">
          <ArticlePreview :article="article" />
        </div>
      </template>

    </div>
  </div>

  <div class="container-lg">
    <SectionHeading 
      heading="Who We Are?"
      sub-heading="Our Team"
      alignment="text-end"
    >
      <template #action>
        <p class="h5">
          <RouterLink to="/about"><em>About Us</em></RouterLink>
        </p>
      </template>
    </SectionHeading>
    
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