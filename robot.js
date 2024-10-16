//
// 応用プログラミング (robot)
// G384712023 西村和真
//
"use strict"; // 厳格モード

import * as THREE from "three"

const seg = 12; // 円や円柱の分割数
const gap = 0.01; // 胸のマークなどを浮かせる高さ

export function makeMetalRobot() {
  // メタルロボットの設定
  const metalRobot = new THREE.Group //metalRobotグループを作っている
  const metalMaterial = new THREE.MeshPhongMaterial( // Phong・・・光沢のある素材　前回のとは別
    {color: 0x707777, shininess: 500, specular: 0x808080 });
  const redMaterial = new THREE.MeshBasicMaterial({color: 0xc00000});
  const legRad = 0.5; // 脚の円柱の半径
  const legLen = 3; // 脚の円柱の長さ
  const legSep = 1.2; // 脚の間隔
  const bodyW = 3; // 胴体の幅
  const bodyH = 3; // 胴体の高さ
  const bodyD = 2; // 胴体の奥行
  const armRad = 0.4; // 腕の円柱の半径
  const armLen = 3.8; // 腕の円柱の長さ
  const headRad = 1.2; // 頭の半径
  const eyeRad = 0.2; // 目の半径
  const eyeSep = 0.8; // 目の間隔
  //  脚の作成
  const legGeometry
    = new THREE.CylinderGeometry(legRad, legRad, legLen, seg, seg); //Cylinder・・・円柱
  const legR = new THREE.Mesh(legGeometry, metalMaterial);
  legR.position.set(-legSep/2, legLen/2, 0); //　1/2しているのは半径だから
  metalRobot.add(legR); //metalRobotに右足を追加

  const legL = new THREE.Mesh(legGeometry, metalMaterial);
  legL.position.set(legSep/2, legLen/2, 0);
  metalRobot.add(legL);
  //  胴体の作成
  const bodyGeometry = new THREE.BoxGeometry(bodyW - bodyD, bodyH, bodyD);
  const body = new THREE.Group; //bodyグループ
  body.add(new THREE.Mesh(bodyGeometry, metalMaterial));
  const bodyL = new THREE.Mesh(
    new THREE.CylinderGeometry(
      bodyD/2, bodyD/2, bodyH, seg, 1, false, 0, Math.PI),
    metalMaterial);
  bodyL.position.x = (bodyW - bodyD)/2;
  body.add(bodyL);
  
  const bodyR = new THREE.Mesh(
    new THREE.CylinderGeometry(
      bodyD/2, bodyD/2, bodyH, seg, 1, false, Math.PI, Math.PI),
    metalMaterial);
  bodyR.position.x = -(bodyW - bodyD) / 2;
  body.add(bodyR);
  //マークの追加
  const triangleGeometry = new THREE.BufferGeometry();
  const triangleVertices = new Float32Array( [
    0, 0, bodyD/2 + gap,
    (bodyW - bodyD)/2, bodyH/2, bodyD/2+gap,
    -(bodyW - bodyD)/2, bodyH/2, bodyD/2+gap] );
  triangleGeometry.setAttribute( 'position',
    new THREE.BufferAttribute( triangleVertices, 3));
  body.add(new THREE.Mesh(triangleGeometry, redMaterial));

  body.children.forEach((child) => { //bodyグループへの影の追加
    child.castShadow = true;
    child.receiveShadow = true;
  });

  body.position.y = legLen + bodyH/2;
  metalRobot.add(body);

  //  腕の作成
  const armGeometry 
  = new THREE.CylinderGeometry(armRad, armRad, armLen, seg, 1);

  const armL = new THREE.Mesh(armGeometry, metalMaterial);
  armL.position.set(bodyW/2 + armRad, legLen + bodyH - armLen/2, 0);
  metalRobot.add(armL);

  const armR = new THREE.Mesh(armGeometry, metalMaterial);
  armR.position.set(-(bodyW/2 + armRad), legLen + bodyH - armLen/2, 0);
  metalRobot.add(armR);

  //  頭の作成
  const head = new THREE.Group; //headグループ
  const headGeometry = new THREE.SphereGeometry(headRad, seg, seg);
  head.add(new THREE.Mesh(headGeometry, metalMaterial));
  //　目の追加
  const circleGeometry = new THREE.CircleGeometry(eyeRad, seg);
  const eyeL = new THREE.Mesh(circleGeometry, redMaterial);
  eyeL.position.set(eyeSep/2, headRad/3, headRad-0.04);
  head.add(eyeL);

  const eyeR = new THREE.Mesh(circleGeometry, redMaterial);
  eyeR.position.set(-eyeSep/2, headRad/3, headRad-0.04);
  head.add(eyeR);

  head.children.forEach((child) => { //headグループへの影の追加
    child.castShadow = true;
    child.receiveShadow = true;
  });

  head.position.y = legLen + bodyH + headRad;
  metalRobot.add(head);

  

  // 影についての設定
  metalRobot.children.forEach((child) => { //metalRobotグループへの影の追加　グループの中にある子要素：meshたちに追加される
    child.castShadow = true;
    child.receiveShadow = true;
  });
  // 作成結果を戻す
  return metalRobot;
}

export function makeCBRobot() {
  // 段ボールロボットの設定
  const cardboardRobot = new THREE.Group
  const cardboardMaterial = new THREE.MeshLambertMaterial({ color: 0xccaa77 });
  const blackMaterial = new THREE.MeshBasicMaterial({color: "black"});
  const legW = 0.8; // 脚の幅
  const legD = 0.8; // 脚の奥行
  const legLen = 3; // 脚の長さ
  const legSep = 1.2; // 脚の間隔
  const bodyW = 2.2; // 胴体の幅
  const bodyH = 3; // 胴体の高さ
  const bodyD = 2; // 胴体の奥行
  const armW = 0.8; // 腕の幅
  const armD = 0.8; // 腕の奥行
  const armLen = 3.8; // 腕の長さ
  const headW = 4; // 頭の幅
  const headH = 2.4; // 頭の高さ
  const headD = 2.4; // 頭の奥行
  const eyeRad = 0.2; // 目の半径
  const eyeSep = 1.6; // 目の間隔
  const eyePos = 0.2; // 目の位置(顔の中心基準の高さ)
  const mouthW = 0.6; // 口の幅
  const mouthH = 0.5; // 口の高さ
  const mouthT = 0.2; // 口の頂点の位置(顔の中心基準の高さ)
  //  脚の作成
  const legGeometry1 = new THREE.BoxGeometry(legW, legLen, legD);
  const legR1 = new THREE.Mesh(legGeometry1, cardboardMaterial);
  legR1.position.set(-legSep/2, legLen/2, 0); 
  cardboardRobot.add(legR1); 

  const legL1 = new THREE.Mesh(legGeometry1, cardboardMaterial);
  legL1.position.set(legSep/2, legLen/2, 0);
  cardboardRobot.add(legL1); 
  //  胴体の作成
  const bodyGeometry1 = new THREE.BoxGeometry(bodyW, bodyH, bodyD);
  const bodyex = new THREE.Mesh(bodyGeometry1, cardboardMaterial);
  bodyex.position.y = bodyW / 1.5 + legLen;
  cardboardRobot.add(bodyex);
  //  腕の設定
  const armGeometry1 = new THREE.BoxGeometry(armW, armLen, armD);
  const armLeft = new THREE.Mesh(armGeometry1, cardboardMaterial);
  armLeft.position.set(bodyH/4 + armW, armLen + bodyH - legLen*0.9, 0);
  cardboardRobot.add(armLeft);

  const armRight = new THREE.Mesh(armGeometry1, cardboardMaterial);
  armRight.position.set(-(bodyH/4 + armW), armLen + bodyH - legLen*0.9, 0);
  cardboardRobot.add(armRight);
  //  頭の設定
  const headex = new THREE.Group;
  const headGeometry1 = new THREE.BoxGeometry(headW, headH, headD);
  const head1 = new THREE.Mesh(headGeometry1, cardboardMaterial);
  headex.add(head1);

  headex.children.forEach((child) => { //headexグループへの影の追加　
    child.castShadow = true;
    child.receiveShadow = true;
  });

  //目の作成
  const circleGeometry1 = new THREE.CircleGeometry(eyeRad, seg);
  const eyeRight = new THREE.Mesh(circleGeometry1, blackMaterial);
  eyeRight.position.set(eyeSep/2, eyePos, headD/2 + gap);
  headex.add(eyeRight);

  headex.position.y = legLen + bodyH + headH/2;
  const eyeLeft = new THREE.Mesh(circleGeometry1, blackMaterial);
  eyeLeft.position.set(-eyeSep/2, eyePos, headD/2 + gap);
  headex.add(eyeLeft);
  
  //口の作成
  const triangleGeometry1 = new THREE.BufferGeometry();
  const mouth = new Float32Array([
    0, - mouthT, headD/2 + gap,
    -mouthW/2, -(mouthT + mouthH), headD/2 + gap,
    mouthW/2, -(mouthT + mouthH), headD/2 + gap 
  ]);
  triangleGeometry1.setAttribute('position',
    new THREE.BufferAttribute(mouth, 3)
  );
  headex.add(new THREE.Mesh(triangleGeometry1, blackMaterial));

  cardboardRobot.add(headex);
  
  // 影についての設定
  cardboardRobot.children.forEach((child) => { //cardboardRobotグループへの影の追加　
    child.castShadow = true;
    child.receiveShadow = true;
  });

  // 再生結果を戻す
  return cardboardRobot;
}
