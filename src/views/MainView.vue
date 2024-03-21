<script setup lang="ts">
import { ref, onMounted } from 'vue';
import FoodCard, { Food } from '../components/FoodCard';
import Image from '../components/Image';
import SearchInput from '../components/SearchInput';
import Header from '../components/Header.vue';

const categories = [
    {
        id: 1,
        name: 'Завтраки',
        foods: [
            {
                id: 1,
                name: 'Блюдо'
            },
            {
                id: 1,
                name: 'Блюдо 1'
            },
            {
                id: 2,
                name: 'Блюдо 2'
            },
            {
                id: 3,
                name: 'Блюдо 3'
            },
            {
                id: 4,
                name: 'Блюдо 4'
            },
            {
                id: 5,
                name: 'Блюдо 5'
            },
            {
                id: 6,
                name: 'Блюдо'
            },
            {
                id: 7,
                name: 'Блюдо 1'
            },
            {
                id: 8,
                name: 'Блюдо 2'
            },
            {
                id: 9,
                name: 'Блюдо 3'
            },
            {
                id: 10,
                name: 'Блюдо 4'
            },
            {
                id: 11,
                name: 'Блюдо 5'
            }
        ]
    },
    {
        id: 2,
        name: 'Салаты',
        foods: [
            {
                id: 1,
                name: 'Блюдо'
            },
            {
                id: 1,
                name: 'Блюдо'
            },
            {
                id: 2,
                name: 'Блюдо 2'
            },
            {
                id: 3,
                name: 'Блюдо 3'
            },
            {
                id: 4,
                name: 'Блюдо 4'
            },
            {
                id: 5,
                name: 'Блюдо 5'
            }
        ]
    },
    {
        id: 3,
        name: 'Горячее',
        foods: [
            {
                id: 1,
                name: 'Блюдо'
            },
            {
                id: 1,
                name: 'Блюдо 1'
            },
            {
                id: 2,
                name: 'Блюдо 2'
            },
            {
                id: 3,
                name: 'Блюдо 3'
            },
            {
                id: 4,
                name: 'Блюдо 4'
            },
            {
                id: 5,
                name: 'Блюдо 5'
            }
        ]
    },
    {
        id: 4,
        name: 'Напитки',
        foods: [
            {
                id: 1,
                name: 'Блюдо'
            },
            {
                id: 1,
                name: 'Блюдо'
            },
            {
                id: 2,
                name: 'Блюдо 2'
            },
            {
                id: 3,
                name: 'Блюдо 3'
            },
            {
                id: 4,
                name: 'Блюдо 4'
            },
            {
                id: 5,
                name: 'Блюдо 5'
            }
        ]
    },
  {
    id: 5,
    name: 'Напитки 4',
    foods: [
      {
        id: 1,
        name: 'Блюдо'
      },
      {
        id: 1,
        name: 'Блюдо'
      },
      {
        id: 2,
        name: 'Блюдо 2'
      },
      {
        id: 3,
        name: 'Блюдо 3'
      },
      {
        id: 4,
        name: 'Блюдо 4'
      },
      {
        id: 5,
        name: 'Блюдо 5'
      }
    ]
  },
  {
    id: 6,
    name: 'Напитки 3',
    foods: [
      {
        id: 1,
        name: 'Блюдо'
      },
      {
        id: 1,
        name: 'Блюдо'
      },
      {
        id: 2,
        name: 'Блюдо 2'
      },
      {
        id: 3,
        name: 'Блюдо 3'
      },
      {
        id: 4,
        name: 'Блюдо 4'
      },
      {
        id: 5,
        name: 'Блюдо 5'
      }
    ]
  },

]

const activeElement = ref('1');
const isPinned = ref(false);
const headerTab = ref();

const foodExample: Food = {
    id: 1,
    name: 'Каша овсяная с ягодами',
    description: 'Молоко, геркулес, сахар, масло, соль, клубника, ежевика, грецкий орех',
    price: 2400,
    url: "https://s3-alpha-sig.figma.com/img/48ae/3fad/10e547891ac78464d295eb7d83dd957d?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BshNgKx-n0L~ekf-H4AnhtqraCb8qMpRod3CNxhpAguiWEc6rYeNgXpWf5ok0wBmqW7cW3PYPn1gpmiMcZ6~0GaGG5GGhBN0njEYlbMatrtGORzeXFGpbtT7UKzPXuKVDV8HJfOIBPvSnIJ19cCnabv2iccwaoLlx4TnZmEawkW35YZ-FvNqyWvo70KkHaN0YbGMYUF~kK6QU-4ytcmWw9vbMxL-4JM6-fiTrJegqRrL8MGD4oR6QJDR-pCdUOuUARQTi4v6NyCH7FMraeopKW7ODRqK2wUVDo~6kDLqMWDpltIaBR9H4Gn0PthtG67uKryVAw8D-7MGdb8Jta79Ig__"
};

const branches = [
    {
        url: 'https://s3-alpha-sig.figma.com/img/759a/ee76/e6cc3331129cb98625552d07b3db5f12?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jHJjAGrNR5SyfU1xf6nnFED0KhN8bS5ngEuWco5OpD~zfYW66cgcQ-OJP9MZqoLmT4nu9yrTNMHe2XDgo48l76SMWtIuatmElohmr3xxFp2XtRTtVYT-Dv8aKBT7NL8O4mYHIBGTkktSGI9d4gtrMYUlyYf86JaIPdj~gtf379Bv83kzC1pfKxYyiC1sk0ayXzEPFXjDWI5dKVXJzOGSvy1FW8LWZGsmXuaaZNbcdV-Q5nJgRfBmyAV0JTLris5YGSQmhNDeSkny4Ft3Uw-bl6-O67Uy8M28mFspQIWXRHVTuoVxWcezwb8WBDXbkT2pNsxcHsr4WuaeOb7pY5MuIw__'
    },
    {
        url: 'https://s3-alpha-sig.figma.com/img/26e0/aed9/de47154fa5c404233e6957e034de6e59?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iIRSVlHA4rfNw9bEap51EqoaNKvJQvEV1ewXr2zKJxvY2IN1lrFfSTEWBNBORIvDAAojXDoKAnkE1i3ZE4jUCX6C2aw9omkwC5RDGpJaLUGmHFacNyiJQyGuS9Hda1S7XjL2h1j6VxXe0mLJhiH-j0O6ntwFNkTuoBv~Cer25MQRpoLMybHvySbLgmgIRk4~ihQhHZI2lytHPliihPD5vg5dLN-rxEaVsLzlRbVaj6bZjTYb8uY9tMBT61bwiXl9RcARZOC-npFXxkxuUqeiEt2jt0OfqEIG4s4iYIv8u~G3U4VcXUPQDeq8Jdf4UKs~zPWrt0xTxJWYpbBGvR5MnQ__'
    },
    {
        url: 'https://s3-alpha-sig.figma.com/img/4cfe/6397/a2ed72f9096093229cd940b57a3323df?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aR06x5js0qsIHgtRkSOvA~ctAsgN8symfzsaysXfubeFHMwjirpytd8OY9LnTBbtVAhDMT-hGQD4HBVcRls15Wc0NY2RvsBRKajOQpqwxhJYAUAX1PCCJFr-mWo8zkQm-gUMhv0kJnjmSwzl4X41rZP6FYIeFyP~RVJvAc20F4oxs1dd6QNTnZHBWYm92xH8AkRn5ZOqwrDRlPHeXouYjTnn19e5F3HzWevOervUPCMJKPDDLw3rQN~ZEJE9fMaj1ncYLntwIsik1CC5VqMCn8KXkJA1QcDL1iL9U3h4NRwPEA1F3cSK~PJgdOn87hNCnuobm8dNOOhtv6re4rsKfw__'
    }
];

onMounted(() => {

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activeElement.value = entry.target.getAttribute('id')!;
            }
        });
    },

        {
          threshold: [0],
            rootMargin: '0px 0px -90% 0px'
        });


  document.querySelectorAll('.section2').forEach((section) => {
    observer.observe(section);
  });

    const el = document.querySelector(".scrolled")!
    const observer2 = new IntersectionObserver(
        ([e]) => {
            if (e.intersectionRatio < 1) {
                isPinned.value = true;
            }
            else {
                isPinned.value = false;
            }

        },
        { threshold: [1] }
    );
    observer2.observe(el);
});

const scrollToElem = (id: number) => {
    const scroll = document.getElementById(id.toString());

    const getCategoryCurrentCategory = document.getElementById('category'+activeElement.value);
  console.log(getCategoryCurrentCategory, activeElement.value, id);
    activeElement.value = id.toString();

  console.log(parseInt(activeElement.value) < id);
    if (parseInt(activeElement.value) < id) {
      console.log('asda');
      headerTab.value.scrollRight = 1000;
    }

    window.scrollTo({
        top: Math.round(scroll!.getBoundingClientRect().top + document.documentElement.scrollTop) - 70,
        behavior: 'smooth'
    })
}

</script>

<template>
    <div>
        <div class="mb-4">
            <Header :item="{
              title: 'Привет, Мария!',
              store: {
                name: 'Villa Pasta',
            description: 'Ресторан итальянской кухни',
            address: 'Молдогуловой 32'
              },
                url: 'https://s3-alpha-sig.figma.com/img/dc8d/d16f/eba03ca4cfd8b8e2ad89a8ae1e92a6dd?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pbhXBg7JbsU5v0sCBTzKBBGoMa0N7xypTNUDSITWIzbmnNIe11xrsX50FH~X32fdf5FYapSrbhr6oXqOnoSV-F7zxDq3wEXyo8NeFkxMWw847gWiGh4~2cCe8OyTqgnI85Ehw-f4TmVsZYBOrPs7vR4kaYF6obZKgH~q9O3Y3ldXkjVHzewSyWKCFvE-iFIQc55quYqwsIap7UwWCSrzV3cC3CHTYWcciboi-xfc9MyeY9czEKvhT0kvo03ehC34AYUla4LYkewx-IvSzZ6fdClUBMCyyODGLuQmjwiguTB9nqAh1fxCzF121oE88VuILmepDzXL~NHLBXq8cdIudg__'
            }"></Header>
        </div>
        <div class="px-4">
            <SearchInput class="mb-2"></SearchInput>
            <div class="gap-3 py-2  flex w-full overflow-scroll">
            <Image class="w-[154px] h-[88px] flex-shrink-0 rounded-2xl" :url="item.url" v-for="item in branches"></Image>
        </div>
        </div>
        <div ref="headerTab" class="flex scrolled  px-4 py-2 -top-[1px] overflow-scroll sticky w-full z-10 bg-white gap-3" :class="{
            'shadow-lg tr-bg rounded-b-[16px]': isPinned
        }">
            <div :id="'category'+item.id" @click="() => scrollToElem(item.id)"
                class="py-[14px] text-nowrap text-[#66666E] px-[19.2px] rounded-[16px] cursor-pointer" :class="{
            'bg-[#202020] !text-white': activeElement == item.id.toString()
        }" :key="item.id" v-for="item in categories">
                {{ item.name }}
            </div>
        </div>
        <div class="px-4" v-for="item in categories" :key="item.id">
            <div class="">
                <div :id="item.id.toString()" class="section2 font-medium py-4">{{ item.name }}</div>
                <div class="grid lg:grid-cols-3 gap-3">
                    <FoodCard :food="foodExample" v-for="_ in item.foods">
                    </FoodCard>
                </div>
            </div>
        </div>
        <div class="mt-[300px]"></div>
    </div>
</template>

<style scoped>
.tr-bg {
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
}
</style>
