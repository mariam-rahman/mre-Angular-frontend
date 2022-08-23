<?php

use Illuminate\Http\Request;
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

//crash report
Route::post('/crash', 'CrashController@index');
Route::get('/crash', 'CrashController@index');
/*
$RouteVersion = 332;
Route::prefix('v' . $RouteVersion)->middleware('mobile.headers')->group(function () use ($RouteVersion) {
    Route::post('/verify_phone', "V${RouteVersion}Home@verify_phone");
    Route::post('/verify_otp', "V${RouteVersion}Home@verify_otp");
    Route::middleware('auth:api')->group(function () use ($RouteVersion) {
        Route::post('/register', "V${RouteVersion}Account@register");
        Route::post('/account', "V${RouteVersion}Account@main_account");
        Route::post('/subscription', "V${RouteVersion}Account@subscription");
        Route::post('/check_datasharing', "V${RouteVersion}Account@check_datasharing");
        Route::post('/add_sharing_child', "V${RouteVersion}Account@add_sharing_child");
        Route::post('/add_data_gifting', "V${RouteVersion}Account@add_data_gifting");
    });
});


$RouteVersion = 333;
Route::prefix('v' . $RouteVersion)->middleware('mobile.headers')->group(function () use ($RouteVersion) {
    Route::post('/verify_phone', "V${RouteVersion}Home@verify_phone");
    Route::post('/verify_otp', "V${RouteVersion}Home@verify_otp");
    Route::middleware('auth:api')->group(function () use ($RouteVersion) {
        Route::post('/register', "V${RouteVersion}Account@register");
        Route::post('/account', "V${RouteVersion}Account@main_account");
        Route::post('/subscription', "V${RouteVersion}Account@subscription");
        Route::post('/check_datasharing', "V${RouteVersion}Account@check_datasharing");
        Route::post('/add_sharing_child', "V${RouteVersion}Account@add_sharing_child");
        Route::post('/add_data_gifting', "V${RouteVersion}Account@add_data_gifting");
        Route::post('/redeem', "V${RouteVersion}Account@redeem");
    });
}); */

$RouteVersion = 334;
Route::prefix('v' . $RouteVersion)->middleware('mobile.headers')->group(function () use ($RouteVersion) {
    Route::post('/verify_phone', "V${RouteVersion}Home@verify_phone");
    Route::post('/verify_otp', "V${RouteVersion}Home@verify_otp");
    Route::middleware('auth:api')->group(function () use ($RouteVersion) {
        Route::post('/register', "V${RouteVersion}Account@register");
        Route::post('/account', "V${RouteVersion}Account@main_account");
        Route::post('/subscription', "V${RouteVersion}Account@subscription");
        Route::post('/check_datasharing', "V${RouteVersion}Account@check_datasharing");
        Route::post('/add_sharing_child', "V${RouteVersion}Account@add_sharing_child");
        Route::post('/add_data_gifting', "V${RouteVersion}Account@add_data_gifting");
        Route::post('/redeem', "V${RouteVersion}Account@redeem");
        Route::post('/recharge', "V${RouteVersion}Account@recharge");
        Route::post('/remove_sharing_child', "V${RouteVersion}Account@remove_sharing_child");
 Route::post('/faqs',"V${RouteVersion}Faq");
        
    });
});


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
