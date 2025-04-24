let circles = [];
let clouds = [];
let wingAngle = 0;

function setup() { // 設定
  createCanvas(windowWidth, windowHeight); // 建立畫布

  // 初始化鳥
  for (let i = 0; i < 10; i++) {
    circles.push({
      x: random(width),
      y: random(height),
      dx: random(-2, 2),
      dy: random(-2, 2),
      size: random(20, 50),
      color: [random(255), random(255), random(255)] // 隨機顏色
    });
  }

  // 初始化雲
  for (let i = 0; i < 5; i++) {
    clouds.push({
      x: random(width),
      y: random(height / 2),
      size: random(50, 150),
      speed: random(0.5, 1.5)
    });
  }
}

function draw() { // 畫
  // 畫天空背景
  background("#7EA3CC"); // 天空藍色
  drawSun();
  drawClouds();

  // 更新翅膀角度
  wingAngle = sin(frameCount * 0.1) * PI / 6; // 翅膀拍動角度

  // 畫鳥
  for (let circle of circles) {
    circle.x += circle.dx;
    circle.y += circle.dy;

    // 碰到牆壁時反彈並隨機變換顏色
    if (circle.x < 0 || circle.x > width) {
      circle.dx *= -1;
      circle.color = [random(255), random(255), random(255)];
    }
    if (circle.y < 0 || circle.y > height) {
      circle.dy *= -1;
      circle.color = [random(255), random(255), random(255)];
    }

    // 畫鳥（有翅膀拍動效果）
    drawBird(circle.x, circle.y, circle.size, circle.color);
  }
}

function drawSun() {
  fill("#FFD700"); // 太陽黃色
  noStroke();
  ellipse(width - 100, 100, 150, 150); // 太陽位置
}

function drawClouds() {
  fill(255, 200); // 雲的顏色
  noStroke();
  for (let cloud of clouds) {
    ellipse(cloud.x, cloud.y, cloud.size, cloud.size / 2); // 雲的形狀
    ellipse(cloud.x - cloud.size / 2, cloud.y, cloud.size / 1.5, cloud.size / 2);
    ellipse(cloud.x + cloud.size / 2, cloud.y, cloud.size / 1.5, cloud.size / 2);

    // 雲移動
    cloud.x += cloud.speed;
    if (cloud.x > width + cloud.size) {
      cloud.x = -cloud.size; // 從左邊重新出現
    }
  }
}

function drawBird(x, y, size, color) {
  fill(color);
  noStroke();
  push();
  translate(x, y);

  // 畫身體
  ellipse(0, 0, size, size / 2);

  // 畫頭（與身體顏色一致）
  ellipse(size / 3, -size / 4, size / 3, size / 3);

  // 畫眼睛
  fill(0); // 黑色眼睛
  ellipse(size / 3 + size / 12, -size / 4, size / 12, size / 12);

  // 畫嘴巴（移到頭的右側）
  fill("#FFA500"); // 橘色嘴巴
  triangle(
    size / 3 + size / 3, -size / 4,          // 嘴巴尖端
    size / 3 + size / 6, -size / 4 - size / 12, // 嘴巴上方
    size / 3 + size / 6, -size / 4 + size / 12  // 嘴巴下方
  );

  // 畫尾巴
  fill(color);
  triangle(
    -size / 2, 0, // 尾巴尖端
    -size / 3, -size / 8, // 尾巴上方
    -size / 3, size / 8   // 尾巴下方
  );

  // 畫翅膀（拍動效果）
  push();
  rotate(-wingAngle); // 左翅膀
  ellipse(-size / 2, 0, size / 2, size / 4);
  pop();

  push();
  rotate(wingAngle); // 右翅膀
  ellipse(size / 2, 0, size / 2, size / 4);
  pop();

  pop();
}
