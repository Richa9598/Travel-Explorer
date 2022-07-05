import React, { useState, useEffect } from 'react';

type SiteProps = {
    site: {
        id: number;
        site_name: string;
        site_description: string;
        site_rating: number;
        site_price: number;
        des_id: number;
        img_url: string;
        
    };
    onDelete: (id: number) => void;
};

const Site = (site: SiteProps) => {
    return (
        <tr>
            <td>{site.site.id}</td>
            <td>{site.site.site_name}</td>
            <td>{site.site.site_description.substring(0, 60)}...</td>
            <td>${site.site.site_price}</td>
            <td>{site.site.site_rating} Stars</td>
            <td>{site.site.des_id}</td>
            <td><button
                        onClick={() => site.onDelete(site.site.id)}
                    >X</button></td>

            
        </tr>
        
    );
};

export default Site;