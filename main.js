window.onload = () => {

    // "Import" des classes box2dweb
let b2World = Box2D.Dynamics.b2World;
let b2Vec2 = Box2D.Common.Math.b2Vec2;
let b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
let b2BodyDef = Box2D.Dynamics.b2BodyDef;
let b2Body = Box2D.Dynamics.b2Body;
let b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
let b2Fixture = Box2D.Dynamics.b2Fixture;
let b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;



let context = window.document.getElementsByTagName("canvas")[0].getContext('2d');
console.log('Début du code');

function CreateBall(_x,_y,_radius,_density) {
    // Créer la matière (b2body) pour la bille
    let billeBodyDef = new b2BodyDef();
    billeBodyDef.position.Set(_x/scale,_y/scale);
    billeBodyDef.type = b2Body.b2_dynamicBody;
    let billeBody = world.CreateBody(billeBodyDef);

    // Créer la fixture de la bille
    let billefixDef = new b2FixtureDef();
    billefixDef.shape = new b2CircleShape(_radius/scale);
    billefixDef.density = _density;
    billefixDef.friction = 0.1;
    billefixDef.restitution = 1;
    billeBody.CreateFixture(billefixDef);
}

function CreateTriangle(_x,_y){
    // Créer la matière (b2Body) pour le triangle
    let triBodyDef = new b2BodyDef();
    triBodyDef.position.Set(_x/scale,_y/scale);
    triBodyDef.type = b2Body.b2_dynamicBody;
    let triBody = world.CreateBody(triBodyDef);

    // Créer la b2Fixture de la bille
    let trifixDef = new b2FixtureDef();

    trifixDef.shape = new b2PolygonShape();
    let tabVec = [
        new b2Vec2(0,-1),
        new b2Vec2(-2,2),
        new b2Vec2(1,0)
        
    ];
    trifixDef.shape.SetAsArray(tabVec,3);

    trifixDef.density = 5;
    trifixDef.friction = 0.1;
    trifixDef.restitution = 1;
    triBody.CreateFixture(trifixDef);
}

// Zoom
let scale = 50;

// créer le monde
let gravity = new b2Vec2(0,10);
let world = new b2World(gravity);

// créer la matière pour le sol
let groundBodyDef = new b2BodyDef();
groundBodyDef.position.Set(40/scale,600/scale);
groundBodyDef.type = b2Body.b2_staticBody;
let groundBody = world.CreateBody(groundBodyDef);

// Matière Coin Gauche
let groundBodyDef2 = new b2BodyDef();
groundBodyDef2.position.Set(0/scale,39/scale);
groundBodyDef2.type = b2Body.b2_staticBody;
let groundBody2 = world.CreateBody(groundBodyDef2);

// Matière Coin Droit
let groundBodyDef3 = new b2BodyDef();
groundBodyDef3.position.Set(800/scale,39/scale);
groundBodyDef3.type = b2Body.b2_staticBody;
let groundBody3 = world.CreateBody(groundBodyDef3);

// Créer la fixture Rectangle
let fixDef = new b2FixtureDef();
fixDef.shape = new b2PolygonShape();
fixDef.shape.SetAsBox(1000/scale, 100/scale);
groundBody.CreateFixture(fixDef);

// Fixture Coin Gauche
let fixDef2 = new b2FixtureDef();
fixDef2.shape = new b2PolygonShape();
fixDef2.shape.SetAsBox(10/scale, 1000/scale);
groundBody2.CreateFixture(fixDef2);

// Fixture Coin Droit
let fixDef3 = new b2FixtureDef();
fixDef3.shape = new b2PolygonShape();
fixDef3.shape.SetAsBox(10/scale,1000/scale);
groundBody3.CreateFixture(fixDef3);

// Préparer la simulation
let TimeStep = 1 / 60;


//  for(let i = 0; i < 6;i++){
//      CreateBall(i*120 + 80, 10 + i * 23, i * 20 + 10, i + 10);
//  }

CreateTriangle(400,300);
// Définir la méthode d'affichage du débug
let debugDraw = new b2DebugDraw();
// Définir les propriétés d'affichage du débug
debugDraw.SetSprite(context);   // contexte
debugDraw.SetFillAlpha(0.3);    // transparence
debugDraw.SetLineThickness(1.0);    // épaisseur du trait
debugDraw.SetDrawScale(scale);  // Zoom sur l'affichage
// Affecter la méthode d'affichage du débug au monde 2dbox
debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
world.SetDebugDraw(debugDraw);

window.setInterval(() => {
    world.Step(TimeStep,10,10);
    world.DrawDebugData();
}, 100/6);
};



