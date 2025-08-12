<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\MenuItem;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class MenuController extends Controller
{
    public function getCategories(): JsonResponse
    {
        $categories = Category::with('menuItems')->get();
        return response()->json($categories);
    }

    public function getMenuItems(): JsonResponse
    {
        $menuItems = MenuItem::with('category')->where('is_available', true)->get();
        return response()->json($menuItems);
    }

    public function getMenuItemsByCategory(int $categoryId): JsonResponse
    {
        $menuItems = MenuItem::with('category')
            ->where('category_id', $categoryId)
            ->where('is_available', true)
            ->get();
        return response()->json($menuItems);
    }

    public function searchMenuItems(Request $request): JsonResponse
    {
        $query = $request->get('query');
        $menuItems = MenuItem::with('category')
            ->where('name', 'like', "%{$query}%")
            ->orWhere('description', 'like', "%{$query}%")
            ->where('is_available', true)
            ->get();
        return response()->json($menuItems);
    }
}
