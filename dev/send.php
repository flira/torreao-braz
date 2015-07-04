<?php
$msg="$cs-msg";
$email="$cs-email"; 
$header="Mensagem de: $cs-name <$cs-email - $cs-fone>";
$to ="INSERIR EMAIL PARA ENVIO";
$send=mail($to,"Novo email do site",$msg,$header);
?>