<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Breakfast', 'icon' => '🍳'],
            ['name' => 'Lunch', 'icon' => '🍽️'],
            ['name' => 'Snacks', 'icon' => '🍿'],
            ['name' => 'Beverages', 'icon' => '🥤'],
            ['name' => 'Desserts', 'icon' => '🍰'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
