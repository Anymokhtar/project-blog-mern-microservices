import React from 'react'
import MainLayout from "../../components/MainLayout";
import BreadCrumbs from '../../components/BreadCrumbs';
import { images, stables } from "../../constants";
import { Link, useParams } from "react-router-dom";
import SuggestedPosts from "./container/SuggestedPosts";
const breadCrumbsData = [
    { name: "Home", link: "/" },
    { name: "Blog", link: "/blog" },
    { name: "Article title", link: "/blog/1" },
];

const postsData = [
    {
        _id: "1",
        image: images.Post1Image,
        title: "help children get better educaction",
        createdAt: "1 Jully"
    },
    {
        _id: "2",
        image: images.Post1Image,
        title: "help children get better educaction",
        createdAt: "1 Jully"
    },
    {
        _id: "3",
        image: images.Post1Image,
        title: "help children get better educaction",
        createdAt: "1 Jully"
    },
    {
        _id: "4",
        image: images.Post1Image,
        title: "help children get better educaction",
        createdAt: "1 Jully"
    },

]

const tagsData = [
    "JAVA",
    "LARAVEL",
    "C++",
    ".NET",
]

const ArticleDetailPage = () => {
    return (
        <MainLayout>
            <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
                <article className="flex-1">
                    <BreadCrumbs data={breadCrumbsData} />
                    <img
                        className="rounded-xl w-full"
                        src={images.Post1Image} alt="{data?.title}" />
                    <Link to="/blog?category=selectedCategory" className="text-primary text-sm font-roboto inline-block mt-4 md:text-base">
                        EDUCATION
                    </Link>
                    <h1 className="text-xl font-medium font-roboto mt-4 text-dark-hard md:text-[26px]">
                        Lorem ipsum dolor sit amctetur obcaecati aperiam labore perferendis.
                    </h1>
                    <div className="mt-4 text-dark-soft">
                        <p className='leading-7'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore amet ea quibusdam voluptate aperiam dolores voluptatibus quisquam sequi ut pariatur accusamus adipisci, tenetur nisi impedit suscipit sint, optio distinctio sit? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo dolorem quos fuga excepturi quo aut sunt fugiat perspiciatis! Repellendus labore provident, cumque quae reiciendis quo laboriosam ratione fuga magnam voluptates. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum rem nihil magni libero, repellendus velit illo fugit, laudantium, recusandae corrupti quia? Animi id nobis vitae porro esse quibusdam exercitationem inventore?</p>
                    </div>

                </article>
                <SuggestedPosts
                    header="Latest Article" 
                    posts={postsData} 
                    tags={tagsData}
                    className="mt-8 lg:mt-0 lg:max-w-xs"
                />
            </section>
        </MainLayout>
    )
}

export default ArticleDetailPage