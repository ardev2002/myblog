"use client"
import React from 'react'

export default function AddSection({ sections, handleSectionChange }: { sections: any, handleSectionChange: any }) {

    return (
        <>
            <div className="divider">📦 Content Sections</div>
            {sections.map((section: any, index: number) => (
                <div key={index} className="bg-base-100 p-4 rounded-lg shadow-md space-y-4">
                    <h2 className="text-xl font-bold">
                        📑 Section {index + 1}
                    </h2>
                    <div>
                        <label className="label font-semibold">Subheading</label>
                        <input
                            type="text"
                            value={section.subheading}
                            onChange={(e) => handleSectionChange(index, 'subheading', e.target.value)}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="image" className='label font-semibold'>Image URL</label>
                        <input type="text" name='imgUrl' value={section.imgUrl} onChange={(e) => handleSectionChange(index, 'imgUrl', e.target.value)} className="input input-bordered w-full"/>
                    </div>
                    <div>
                        <label className="label font-semibold">Paragraph</label>
                        <textarea
                            rows={4}
                            value={section.paragraph}
                            onChange={(e) => handleSectionChange(index, 'paragraph', e.target.value)}
                            className="textarea textarea-bordered w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="label font-semibold">Order</label>
                        <input
                            type="number"
                            value={parseInt(section.order)}
                            onChange={(e) => handleSectionChange(index, 'order', parseInt(e.target.value))}
                            className="input input-bordered w-full"
                            min={1}
                            max={sections.length}
                        />
                    </div>
                </div>
            ))}
        </>
    )
}
