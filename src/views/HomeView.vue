<script setup>
import { onMounted, computed } from 'vue';
import { RouterLink } from 'vue-router';
import HeroBanner from '@/components/HeroBanner.vue';
import SectionHeading from '@/components/SectionHeading.vue';
import ArticlePreview from '@/components/ArticlePreview.vue';
import CardItem from '@/components/CardItem.vue';
import StaffEntry from '@/components/StaffEntry.vue';
import TimeLine from '@/components/TimeLine.vue';
import { Splide, SplideSlide } from '@splidejs/vue-splide';

// Import Pinia stores
import { useCarouselStore } from '@/stores/carouselStore';
import { useArticleStore } from '@/stores/articleStore';
import { useStaffStore } from '@/stores/staffStore';
import { useCardStore } from '@/stores/cardStore';
import { usePageContentStore } from '@/stores/pageContentStore';
import { getSection, getHeroContent } from '@/utils/pageContentUtils';

// Initialize Pinia stores
const carouselStore = useCarouselStore();
const articleStore = useArticleStore();
const staffStore = useStaffStore();
const cardStore = useCardStore();
const pageContentStore = usePageContentStore();

// Page content
const pageContent = computed(() => pageContentStore.getPageContent('home'));
const heroContent = computed(() => getHeroContent(pageContent.value));

// Create a wrapper function for getSection that uses the current pageContent
const getSectionFromCurrentPage = (sectionId) => getSection(pageContent.value, sectionId);

// Fetch data when component mounts
onMounted(async () => {
  try {
    // Fetch all data in parallel
    await Promise.all([
      carouselStore.fetchData(),
      articleStore.fetchFeaturedArticles(),
      staffStore.fetchData(),
      cardStore.fetchAllCards(),
      pageContentStore.fetchPageContent('home')
    ]);
  } catch (err) {
    console.error('Error fetching data:', err);
  }
});
</script>

<template>
  <HeroBanner
    :heading="heroContent?.heading"
    :sub-heading="heroContent?.subHeading"
  />
  <div class="container-lg">
    <SectionHeading
      :heading="getSectionFromCurrentPage('intro')?.heading"
      :sub-heading="getSectionFromCurrentPage('intro')?.subHeading"
      :alignment="getSectionFromCurrentPage('intro')?.alignment"
    />

    <!-- Display intro content from page content data -->
    <div v-if="getSectionFromCurrentPage('intro')?.content" class="intro-content">
      <div 
        v-for="(paragraph, index) in getSectionFromCurrentPage('intro').content" 
        :key="index" 
        class="mb-4"
      >
        <p>{{ paragraph }}</p>
      </div>
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
      :heading="getSectionFromCurrentPage('features')?.heading"
      :sub-heading="getSectionFromCurrentPage('features')?.subHeading"
      :alignment="getSectionFromCurrentPage('features')?.alignment"
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
      :heading="getSectionFromCurrentPage('blog')?.heading"
      :sub-heading="getSectionFromCurrentPage('blog')?.subHeading"
      :alignment="getSectionFromCurrentPage('blog')?.alignment"
      :has-action="getSectionFromCurrentPage('blog')?.hasAction"
    >
      <template #action>
        <p class="h5">
          <RouterLink :to="getSectionFromCurrentPage('blog')?.actionLink || '/blog'">
            <em>{{ getSectionFromCurrentPage('blog')?.actionText || 'Full Blog' }}</em>
          </RouterLink>
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
      :heading="getSectionFromCurrentPage('team')?.heading"
      :sub-heading="getSectionFromCurrentPage('team')?.subHeading"
      :alignment="getSectionFromCurrentPage('team')?.alignment"
      :has-action="getSectionFromCurrentPage('team')?.hasAction"
    >
      <template #action>
        <p class="h5">
          <RouterLink :to="getSectionFromCurrentPage('team')?.actionLink">
            <em>{{ getSectionFromCurrentPage('team')?.actionText || 'About Us' }}</em>
          </RouterLink>
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