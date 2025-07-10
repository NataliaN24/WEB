<?php

header('Content-Type: application/json; charset=utf-8');

$input = file_get_contents('php://input');
$data = json_decode($input, true);

$errors = [];

$requiredFields = ['name', 'teacher', 'description', 'group', 'credits'];

foreach ($requiredFields as $field) {
    if (!isset($data[$field]) || trim($data[$field]) === '') {
        switch ($field) {
            case 'name':
                $errors['name'] = "Името на предмета е задължително поле";
                break;
            case 'teacher':
                $errors['teacher'] = "Името на преподавателя е задължително поле";
                break;
            case 'description':
                $errors['description'] = "Описанието е задължително поле";
                break;
            case 'group':
                $errors['group'] = "Групата е задължително поле";
                break;
            case 'credits':
                $errors['credits'] = "Кредитите са задължително поле";
                break;
        }
    }
}

if (isset($data['name']) && trim($data['name']) !== '') {
    $length = mb_strlen($data['name'], 'UTF-8');
    if ($length < 2 || $length > 150) {
        $errors['name'] = "Името на предмета трябва да е между 2 и 150 символа. Въведени: $length";
    }
}

if (isset($data['teacher']) && trim($data['teacher']) !== '') {
    $length = mb_strlen($data['teacher'], 'UTF-8');
    if ($length < 3 || $length > 200) {
        $errors['teacher'] = "Името на преподавателя трябва да е между 3 и 200 символа. Въведени: $length";
    }
}

if (isset($data['description']) && trim($data['description']) !== '') {
    $length = mb_strlen($data['description'], 'UTF-8');
    if ($length < 10) {
        $errors['description'] = "Описанието трябва да е с дължина поне 10 символа, а вие сте въвели $length";
    }
}

if (isset($data['group']) && trim($data['group']) !== '') {
    $validGroups = ['М', 'ПМ', 'ОКН', 'ЯКН'];
    if (!in_array($data['group'], $validGroups)) {
        $errors['group'] = "Невалидна група, изберете една от М, ПМ, ОКН и ЯКН";
    }
}

if (isset($data['credits']) && trim($data['credits']) !== '') {
    if (!is_int($data['credits']) || $data['credits'] <= 0) {
        $errors['credits'] = "Кредитите трябва да са цяло положително число";
    }
}

if (empty($errors)) {
    echo json_encode(["success" => true], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(["success" => false, "errors" => $errors], JSON_UNESCAPED_UNICODE);
}
