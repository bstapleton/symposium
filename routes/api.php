<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::get('/users', 'API\UserController@index'); // TODO
Route::post('/users', 'API\UserController@create'); // TODO
Route::get('/users/{id}', 'API\UserController@get'); // TODO
Route::put('/users/{id}', 'API\UserController@update'); // TODO
Route::delete('/users/{id}', 'API\UserController@delete'); // TODO

Route::get('/sections', 'API\SectionController@index');
Route::post('/sections', 'API\SectionController@create'); // TODO
Route::get('/sections/{id}', 'API\SectionController@get');
Route::put('/sections/{id}', 'API\SectionController@update'); // TODO
Route::delete('/sections/{id}', 'API\SectionController@delete'); // TODO - also consider how to handle cascading
Route::get('/sections/{id}/topics', 'API\SectionController@getTopics');

Route::get('/topics', 'API\TopicController@index');
Route::post('/topics', 'API\TopicController@create'); // TODO
Route::get('/topics/{id}', 'API\TopicController@get');
Route::put('/topics/{id}', 'API\TopicController@update'); // TODO
Route::delete('/topics/{id}/delete', 'APOI\TopicController@delete'); // TODO - also consider how to handle cascading
Route::get('/topics/{id}/posts', 'API\TopicController@getPosts');

Route::get('/posts', 'API\PostController@index');
Route::post('/posts', 'API\PostController@create'); // TODO
Route::get('/posts/{id}', 'API\PostController@get');
Route::put('/posts/{id}', 'API\PostController@update'); // TODO
Route::delete('/posts/{id}', 'API\PostController@delete'); // TODO - no need to consider cascading
Route::get('/posts/{id}/replies', 'API\PostController@getReplies');
