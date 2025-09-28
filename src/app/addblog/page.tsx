"use client";
import { publishBlog } from '@/actions/publishBlog';
import AddSection from '@/components/AddSection';
import React, { useState } from 'react'

export default function page() {
    const [sections, setSections] = useState<any[]>([
        { subheading: '', imgUrl: '', paragraph: '', order: 1 },
    ]);

    const addSection = () => {
        setSections([
            ...sections,
            { subheading: '', imgUrl: '', paragraph: '', order: sections.length + 1 },
        ]);
    };

    const removeLastSection = () => {
        if (sections.length === 1) {
            alert("At least one section is required.");
            return;
        }
        const updated = sections.slice(0, -1); // removes last item
        setSections(updated.map((sec, i) => ({ ...sec, order: i + 1 })));
    };

    const handleSectionChange = (index: number, field: any, value: any) => {
        const updated = [...sections];
        updated[index][field] = value;
        setSections(updated);
    };
    return (
        <>
            <div className="max-w-4xl mx-auto p-6 bg-base-200 text-base-content">
                <h1 className="text-4xl font-bold mb-6 text-center">📝 Add New Blog Post</h1>

                <form className="space-y-6" action={publishBlog}>
                    {/* Title */}
                    <div>
                        <label className="label font-semibold">Blog Name</label>
                        <input type="text" name="title" className="input input-bordered w-full" required />
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="label font-semibold">Blog Url</label>
                        <input type="text" name="slug" className="input input-bordered w-full" required />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="label font-semibold">Category</label>
                        <select name="categoryId" className="select select-bordered w-full" required>
                            <option disabled defaultValue={'select'}>Select category</option>
                            <option value="MOBILES">Mobiles</option>
                            <option value="TECHNOLOGY">Technology</option>
                            <option value="TIPS_AND_TRICKS">Tips & Tricks</option>
                            <option value="LIFESTYLE">Lifestyle</option>
                            <option value="HEALTH_AND_WELLNESS">Health & Wellness</option>
                            <option value="ENTERTAINMENT">Entertainment</option>
                            <option value="SPORTS">Sports</option>
                        </select>
                    </div>

                    {/* Filter Tag */}
                    <div>
                        <label className="label font-semibold">Filter Tag</label>
                        <div className="flex gap-4">
                            <label className="cursor-pointer label">
                                <input type="radio" name="filterTag" value="LATEST" className="radio" />
                                <span className="label-text ml-2">Latest</span>
                            </label>
                            <label className="cursor-pointer label">
                                <input type="radio" name="filterTag" value="POPULAR" className="radio" />
                                <span className="label-text ml-2">Popular</span>
                            </label>
                        </div>
                    </div>

                    {/* Author */}
                    <div>
                        <label className="label font-semibold">Author</label>
                        <input type="text" name="author" className="input input-bordered w-full" />
                    </div>

                    {/* Content Sections */}
                    <AddSection sections={sections} handleSectionChange={handleSectionChange} />
                    <input
                        type="hidden"
                        name="sections"
                        value={JSON.stringify(sections)}
                    />
                    <div className='flex justify-between mt-4'>
                        <button type="button" onClick={addSection} className="btn btn-outline btn-primary">
                            ➕ Add Another Section
                        </button>

                        <button type="button" onClick={removeLastSection} className="btn btn-outline btn-error">
                            ❌ Remove Last Section
                        </button>
                    </div>

                    {/* Submit */}
                    <div className="text-center mt-8">
                        <button type="submit" className="btn btn-success px-10">🚀 Publish Blog</button>
                    </div>
                </form>
            </div>
        </>
    )
}
