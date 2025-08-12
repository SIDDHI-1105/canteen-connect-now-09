<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MenuItem;
use App\Models\Category;

class MenuItemSeeder extends Seeder
{
    public function run(): void
    {
        $menuItems = [
            // Breakfast
            [
                'category_name' => 'Breakfast',
                'name' => 'Masala Dosa',
                'description' => 'Crispy dosa with spiced potato filling, served with sambar and chutney',
                'price' => 45.00,
                'image' => null,
                'is_available' => true
            ],
            [
                'category_name' => 'Breakfast',
                'name' => 'Idli Sambar',
                'description' => 'Soft steamed rice cakes with lentil soup and coconut chutney',
                'price' => 35.00,
                'image' => null,
                'is_available' => true
            ],
            [
                'category_name' => 'Breakfast',
                'name' => 'Poha',
                'description' => 'Flattened rice cooked with onions, potatoes, and mild spices',
                'price' => 25.00,
                'image' => null,
                'is_available' => true
            ],

            // Lunch
            [
                'category_name' => 'Lunch',
                'name' => 'Veg Thali',
                'description' => 'Complete meal with rice, dal, vegetables, roti, and curd',
                'price' => 80.00,
                'image' => null,
                'is_available' => true
            ],
            [
                'category_name' => 'Lunch',
                'name' => 'Chicken Biryani',
                'description' => 'Aromatic rice dish with tender chicken and aromatic spices',
                'price' => 120.00,
                'image' => null,
                'is_available' => true
            ],
            [
                'category_name' => 'Lunch',
                'name' => 'Paneer Butter Masala',
                'description' => 'Cottage cheese in rich tomato-based gravy with butter',
                'price' => 95.00,
                'image' => null,
                'is_available' => true
            ],

            // Snacks
            [
                'category_name' => 'Snacks',
                'name' => 'Samosa',
                'description' => 'Crispy pastry filled with spiced potatoes and peas',
                'price' => 15.00,
                'image' => null,
                'is_available' => true
            ],
            [
                'category_name' => 'Snacks',
                'name' => 'Vada Pav',
                'description' => 'Spicy potato fritter in a soft bun with chutney',
                'price' => 20.00,
                'image' => null,
                'is_available' => true
            ],
            [
                'category_name' => 'Snacks',
                'name' => 'Pakora',
                'description' => 'Mixed vegetable fritters in chickpea flour batter',
                'price' => 30.00,
                'image' => null,
                'is_available' => true
            ],

            // Beverages
            [
                'category_name' => 'Beverages',
                'name' => 'Masala Chai',
                'description' => 'Spiced Indian tea with milk and aromatic spices',
                'price' => 15.00,
                'image' => null,
                'is_available' => true
            ],
            [
                'category_name' => 'Beverages',
                'name' => 'Lassi',
                'description' => 'Sweet yogurt-based drink, perfect for hot days',
                'price' => 25.00,
                'image' => null,
                'is_available' => true
            ],
            [
                'category_name' => 'Beverages',
                'name' => 'Lemon Soda',
                'description' => 'Refreshing lemon soda with salt and spices',
                'price' => 20.00,
                'image' => null,
                'is_available' => true
            ],

            // Desserts
            [
                'category_name' => 'Desserts',
                'name' => 'Gulab Jamun',
                'description' => 'Sweet milk solids dumplings in sugar syrup',
                'price' => 35.00,
                'image' => null,
                'is_available' => true
            ],
            [
                'category_name' => 'Desserts',
                'name' => 'Rasgulla',
                'description' => 'Soft cottage cheese balls in light sugar syrup',
                'price' => 30.00,
                'image' => null,
                'is_available' => true
            ],
            [
                'category_name' => 'Desserts',
                'name' => 'Jalebi',
                'description' => 'Crispy spiral-shaped sweet soaked in sugar syrup',
                'price' => 40.00,
                'image' => null,
                'is_available' => true
            ],
        ];

        foreach ($menuItems as $item) {
            $category = Category::where('name', $item['category_name'])->first();
            if ($category) {
                MenuItem::create([
                    'category_id' => $category->id,
                    'name' => $item['name'],
                    'description' => $item['description'],
                    'price' => $item['price'],
                    'image' => $item['image'],
                    'is_available' => $item['is_available']
                ]);
            }
        }
    }
}
