require('@babel/register')({
  ignore: [/dist\//, /node_modules/],
});

require('./server');
