import { useState, useEffect } from 'react';
import { ProductCategory } from '@acme/db';

export const useCategoryNavigation = (allCategories: ProductCategory[] | undefined) => {
    const [path, setPath] = useState<ProductCategory[]>([]);
    const [categoryColumns, setCategoryColumns] = useState<ProductCategory[][]>([]);
    const [isDeletable, setIsDeletable] = useState(false);


    useEffect(() => {
        // Initialize with top-level categories
        const topLevelCategories = allCategories?.filter(cat => !cat.parentId) || [];
        setCategoryColumns([topLevelCategories]);
        // Optionally reset path if desired, or maintain it to attempt to reconstruct navigation
    }, [allCategories]);

    useEffect(() => {
        // Reconstruct columns based on the current path every time path changes
        // This also covers initialization
        let newColumns = [allCategories?.filter(cat => !cat.parentId) || []];
        path.forEach((category, index) => {
            const children = allCategories?.filter(cat => cat.parentId === category.id) || [];
            // Add children only if they exist to avoid empty columns
            if (children.length > 0) {
                newColumns.push(children);
            }
        });
        setCategoryColumns(newColumns);
    }, [path, allCategories]);

    useEffect(() => {
        // Update isDeletable state based on path and categoryColumns
        const selectedCategoryLevel = path.length - 1;
        setIsDeletable(categoryColumns.length - 1 === selectedCategoryLevel);
    }, [path, categoryColumns]); // Dependencies

    const handleSelectCategory = (category: ProductCategory, level: number) => {
        // Adjust path based on selection
        const updatedPath = [...path.slice(0, level), category];
        setPath(updatedPath);
        // Columns will automatically update via the useEffect above
    };

    console.log("Category Columns: ", categoryColumns)
    console.log("path: ", path)

    return { path, categoryColumns, isDeletable, handleSelectCategory };
};