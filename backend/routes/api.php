<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MenuController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Menu API Routes
Route::prefix('menu')->group(function () {
    Route::get('/categories', [MenuController::class, 'getCategories']);
    Route::get('/items', [MenuController::class, 'getMenuItems']);
    Route::get('/category/{categoryId}/items', [MenuController::class, 'getMenuItemsByCategory']);
    Route::get('/search', [MenuController::class, 'searchMenuItems']);
});
