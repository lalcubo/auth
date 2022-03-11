<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\UserController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::post('/login', 'App\Http\Controllers\Auth\LoginController@login');
Route::post('/logout', 'App\Http\Controllers\Auth\LoginController@logout');
Route::post('/registrar', 'App\Http\Controllers\Auth\RegisterController@register');
//para admin de usuarios
Route::get('/users', 'App\Http\Controllers\Admin\UserController@index')->middleware('can:admin.user.index');
Route::get('/users/{user}/edit', 'App\Http\Controllers\Admin\UserController@edit')->middleware('can:admin.user.edit');
Route::put('/users/{user}', 'App\Http\Controllers\Admin\UserController@update')->middleware('can:admin.user.edit');;
Route::delete('/users/{user}', 'App\Http\Controllers\Admin\UserController@destroy')->middleware('can:admin.user.destroy');;

//Route::resource('users', UserController::class);


Route::get('{any}', function () {
    return view('welcome');
})->where('any', '.*');


/* Route::get('/', function () {
    return view('welcome');
}); */

//Auth::routes();

//Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
