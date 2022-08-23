<?php
namespace App\Api;

use App\Logger;

class Ref{
    public static function check($req,$fields = []){
        $ref = '';
        foreach($fields as $f){
            if($req->$f!=''){
                $ref .= '_'.$req->$f;
            }
        }
        if($ref==''){
            return true;
        }
        $refs = md5(utf8_encode('Z78944CtJJ798skHGlT3787854904YuR78'.$ref));
        $mobileRef = utf8_encode($req->header('ref'));
        //Logger::error('reqfailed',$refs.' ** '.$mobileRef.' ** '.$ref);
        if($mobileRef != $refs){
            return false;
        }
        
        return true;
    }
}