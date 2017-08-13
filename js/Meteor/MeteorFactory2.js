class MeteorFactory2 {
  constructor() {
    for(var i = 0; i < 4; i++)
      Nakama.meteorPool.addMeteor();
  }
}
