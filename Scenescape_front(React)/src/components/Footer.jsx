const Footer = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center w-full h-40 mx-auto bg-gray-100">
        <div className="w-[80rem]">
          <div className="flex justify-center items-center">
            <svg
              className="w-20 mr-10"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 476 208"
            >
              <path
                d="M0 0 C1.73899832 3.47799665 1.58979036 7.205682 1 11 C-1.68563998 14.58085331 -3.66076243 16.22326901 -8 17 C-10.35112229 17.20518885 -12.70626138 17.36576871 -15.0625 17.5 C-16.10684456 17.56050034 -16.10684456 17.56050034 -17.17228699 17.6222229 C-19.44797207 17.75244543 -21.72393933 17.87652904 -24 18 C-24.77356842 18.04324402 -25.54713684 18.08648804 -26.34414673 18.13104248 C-41.22293835 18.96268909 -56.10443484 19.55600278 -71 20 C-70.94465088 20.62640381 -70.88930176 21.25280762 -70.83227539 21.89819336 C-69.43529058 37.92499623 -68.51635912 53.92131587 -68 70 C-66.07305298 69.86368164 -66.07305298 69.86368164 -64.10717773 69.72460938 C-59.2711102 69.3838952 -54.43458346 69.05011349 -49.59790039 68.71826172 C-47.51769397 68.57459972 -45.4376108 68.42913984 -43.35766602 68.28173828 C-7.54448154 65.74766458 -7.54448154 65.74766458 -0.15625 71.4140625 C1.79176922 74.08600778 1.52363573 76.56875891 1.4296875 79.7734375 C0.74820192 83.30477188 -1.22075302 84.88247849 -4 87 C-10.61039846 90.30519923 -20.68359287 89.25910335 -28 89.5625 C-29.00804687 89.6049585 -30.01609375 89.64741699 -31.0546875 89.69116211 C-43.36663367 90.15869246 -55.68151967 90.09319148 -68 90 C-67.75552124 91.9025354 -67.75552124 91.9025354 -67.50610352 93.84350586 C-66.92718531 99.07623465 -66.87270667 104.24409093 -66.90234375 109.50390625 C-66.9037587 110.4677977 -66.90517365 111.43168915 -66.90663147 112.42478943 C-66.91218058 115.47072598 -66.92472331 118.51658607 -66.9375 121.5625 C-66.94252159 123.64127497 -66.94708334 125.72005111 -66.95117188 127.79882812 C-66.96213329 132.86591439 -66.9793622 137.93294428 -67 143 C-58.07074086 143.07518896 -49.21963649 143.01895134 -40.3125 142.3125 C-38.75438599 142.19092529 -38.75438599 142.19092529 -37.16479492 142.06689453 C-27.40448327 141.20784224 -17.8276937 139.54179821 -8.21411133 137.67700195 C-7.0980249 137.46132568 -5.98193848 137.24564941 -4.83203125 137.0234375 C-3.35827026 136.72832275 -3.35827026 136.72832275 -1.85473633 136.42724609 C5.89998603 135.26665735 5.89998603 135.26665735 9.8125 137.875 C13.15359043 141.1206307 13.15002493 143.22814457 13.328125 147.83203125 C12.87829442 150.80412615 11.7829282 152.59364257 10 155 C-10.24820753 167.85535285 -52.61206909 168.27881677 -75.61328125 163.69140625 C-81.15303813 162.08659943 -84.98862787 158.83970521 -88 154 C-90.29609925 146.08732044 -90.31291905 138.36096602 -90.34375 130.171875 C-90.35664922 128.71451919 -90.37057405 127.25717215 -90.38545227 125.79983521 C-90.41582387 122.71372309 -90.44133294 119.62762788 -90.46304321 116.54144287 C-90.52170036 108.50386049 -90.6261681 100.46678563 -90.73046875 92.4296875 C-90.74064215 91.63326466 -90.75081554 90.83684181 -90.76129723 90.01628494 C-90.93133221 76.89530613 -91.17665937 63.77998995 -91.70214844 50.66760254 C-91.7746777 48.83214679 -91.84110453 46.99643785 -91.90087891 45.16052246 C-92.21114856 35.86499958 -92.87712797 27.59856477 -96.11181641 18.76611328 C-97.57350867 14.2138941 -97.93316642 9.69746487 -97 5 C-94.47429367 1.58688333 -93.00086696 0.33362232 -89 -1 C-87.66270824 -1.05854584 -86.32251772 -1.06126892 -84.984375 -1.02734375 C-84.16122803 -1.01364746 -83.33808105 -0.99995117 -82.48999023 -0.98583984 C-81.58579346 -0.9698877 -80.68159668 -0.95393555 -79.75 -0.9375 C-70.28316213 -0.85604766 -60.8824354 -1.24889044 -51.4375 -1.875 C-50.77557648 -1.91837494 -50.11365295 -1.96174988 -49.43167114 -2.00643921 C-42.8432363 -2.44450191 -36.2686337 -2.94271949 -29.703125 -3.6484375 C-28.76025635 -3.74914551 -27.8173877 -3.84985352 -26.84594727 -3.95361328 C-25.15195853 -4.14247381 -23.45940952 -4.34511853 -21.76928711 -4.56591797 C-14.26647176 -5.4254405 -6.15650167 -4.76632388 0 0 Z "
                fill="#71D6C0"
                transform="translate(463,6)"
              />
              <path
                d="M0 0 C18.08490805 -0.48988464 35.81871528 3.77719261 49.78515625 15.77734375 C52.9107085 18.93203867 54.28230909 21.29321113 54.4609375 25.78125 C54.16805777 29.60821178 53.49488597 32.2136084 50.8984375 35.15625 C46.74619015 38.05316676 43.63574516 38.58877303 38.78125 37.73046875 C34.76942172 36.50694436 32.37990474 33.6912136 29.6484375 30.65625 C21.46473892 23.21652402 9.28903078 21.57943837 -1.45703125 21.83984375 C-9.54424021 22.80744187 -17.54036276 25.00966081 -23.1015625 31.15625 C-26.83073373 36.68571079 -27.67456185 43.01717231 -26.76953125 49.5546875 C-24.66858012 57.49763822 -19.51651687 61.07308808 -12.74609375 65.203125 C-2.88247723 70.8122929 7.55646012 75.03774966 18.10473633 79.17480469 C49.03367159 91.36314348 49.03367159 91.36314348 56.33984375 106.0546875 C61.65727118 118.32567387 62.4641999 129.33211504 58.16015625 142.078125 C56.30216336 146.61093738 53.97260055 150.35655455 50.8984375 154.15625 C50.42019531 154.76984375 49.94195312 155.3834375 49.44921875 156.015625 C41.70125094 164.83698885 28.42173401 170.12303757 16.8984375 171.15625 C-4.2144892 172.36789041 -26.01386761 171.2323205 -43.1015625 157.15625 C-48.53818826 151.67796427 -52.55339852 147.1046277 -53.1015625 139.15625 C-52.34041405 135.88331165 -51.27644105 134.35232595 -49.0390625 131.84375 C-44.96953825 129.5059382 -41.69085129 129.37770994 -37.1015625 130.15625 C-33.8380858 131.75327051 -31.52106754 133.75757145 -28.8984375 136.25 C-18.77408213 145.80127865 -9.09089166 149.58757808 4.8984375 150.15625 C15.25573283 149.72106952 23.59859407 147.21570454 31.8359375 140.90625 C35.70874448 135.74250736 37.23607462 130.54857721 36.8984375 124.09375 C36.01022738 118.12608825 33.78077595 113.47066768 29.02124023 109.64892578 C23.25517112 105.79252368 17.35680507 102.94027924 10.9609375 100.28125 C8.9268344 99.41594952 6.89298318 98.55005673 4.859375 97.68359375 C3.85616211 97.25933105 2.85294922 96.83506836 1.81933594 96.39794922 C-4.5826333 93.67641666 -10.93875452 90.85090293 -17.27587891 87.98193359 C-18.87497351 87.25872713 -20.47817767 86.5446215 -22.08203125 85.83203125 C-32.8341991 80.81435292 -43.35434313 72.59584709 -48.4765625 61.65625 C-52.39379047 50.69814243 -52.44560363 36.9838622 -47.875 26.28515625 C-42.01294583 14.73346127 -33.90517947 8.44712587 -21.8203125 3.9296875 C-14.44099502 1.53313346 -7.6978108 0.38779903 0 0 Z "
                fill="#71D6C1"
                transform="translate(53.1015625,0.84375)"
              />
              <path
                d="M0 0 C2.875 2.625 2.875 2.625 5 5 C5.721875 4.38125 6.44375 3.7625 7.1875 3.125 C14.10453703 -2.10120575 21.69635232 -1.72359098 30 -1 C33.06648966 -0.10000152 35.41173669 1.14939173 38 3 C38.86625 3.53625 39.7325 4.0725 40.625 4.625 C47.7663942 11.7663942 51.275613 20.55422881 51.375 30.5625 C51.33069198 40.64607248 49.34197322 50.45088895 42.69140625 58.3515625 C37.40559894 63.50308833 31.37024718 66.40724871 24 67 C18.56547769 66.8797952 13.18019263 66.72673088 8 65 C8.02320313 66.19496094 8.04640625 67.38992187 8.0703125 68.62109375 C8.32948903 87.45195 8.32948903 87.45195 4.6875 94.5625 C3 96 3 96 0.5 96.5 C-2 96 -2 96 -3.75 94.1875 C-6.08095521 90.10832839 -6.128893 86.83315342 -6.1418457 82.20874023 C-6.14532013 81.522108 -6.14879456 80.83547577 -6.15237427 80.1280365 C-6.1597235 78.63681789 -6.16507332 77.1455884 -6.16866493 75.654356 C-6.17584878 73.28633225 -6.19153247 70.91851352 -6.21000671 68.55055237 C-6.26236512 61.81750412 -6.31037639 55.08456551 -6.32592773 48.35131836 C-6.33606868 44.23032718 -6.36555142 40.10984893 -6.40724754 35.98906136 C-6.4194815 34.42598431 -6.42469284 32.86283454 -6.42244911 31.29971123 C-6.41383959 23.33929451 -6.49605791 16.28808321 -10.14518738 8.99378967 C-11.54493335 5.72898171 -11.09531265 3.28593796 -10 0 C-6.66739256 -3.08574763 -3.81081596 -1.78875035 0 0 Z M10.421875 15.28466797 C8.63024462 17.44606822 8.58153567 18.64697572 8.48828125 21.4296875 C8.45234863 22.30189941 8.41641602 23.17411133 8.37939453 24.07275391 C8.35731934 24.99749512 8.33524414 25.92223633 8.3125 26.875 C8.28269043 27.81649902 8.25288086 28.75799805 8.22216797 29.72802734 C8.16564154 31.61342586 8.11541053 33.49902467 8.07177734 35.38476562 C8.00955967 37.65168997 7.90298048 39.90830583 7.76953125 42.171875 C7.72183594 43.31140625 7.67414063 44.4509375 7.625 45.625 C7.55152344 47.09839844 7.55152344 47.09839844 7.4765625 48.6015625 C7.78447406 51.20836723 7.78447406 51.20836723 10.22265625 52.80859375 C15.17326671 54.93227334 20.0921661 54.84811822 25.25 53.34375 C30.35814506 51.09926202 33.48138605 47.95598228 36 43 C38.61564522 35.86642213 38.82969428 28.54009962 35.953125 21.40234375 C33.81837008 17.35026266 31.92998067 14.48131104 28 12 C21.47696694 10.47795895 15.7885605 10.91593358 10.421875 15.28466797 Z "
                fill="#000000"
                transform="translate(293,112)"
              />
              <path
                d="M0 0 C5.22027003 3.68266322 8.35391701 7.30006374 9.7109375 13.640625 C10.44652026 20.05587132 9.7758895 25.46407755 5.7109375 30.640625 C-2.33665243 37.77120076 -10.97796293 38.98443298 -21.3515625 38.890625 C-22.21072266 38.89835937 -23.06988281 38.90609375 -23.95507812 38.9140625 C-29.11781026 38.89828639 -33.40074936 38.31206993 -38.2890625 36.640625 C-35.59896539 44.95394494 -35.59896539 44.95394494 -29.2890625 50.640625 C-22.57203929 53.62596865 -16.77243438 53.40573744 -10.0390625 50.890625 C-6.99260209 49.59692263 -5.40212625 48.76014954 -3.1015625 46.328125 C-1.2890625 44.640625 -1.2890625 44.640625 2.2734375 44.640625 C5.7109375 45.640625 5.7109375 45.640625 7.7109375 47.328125 C9.18392621 50.7344114 9.01681385 52.13537796 7.7109375 55.640625 C2.20908237 61.90181607 -4.09726341 65.29499806 -12.2890625 66.640625 C-24.08286683 67.38943797 -33.96216484 66.59022923 -43.24609375 58.78515625 C-50.52743826 51.14183286 -53.13854276 41.56318404 -53.6015625 31.265625 C-53.31740159 21.23119273 -50.36524232 12.04359751 -43.46875 4.703125 C-32.10855218 -5.98882589 -13.52074017 -8.02938153 0 0 Z M-35.2890625 15.640625 C-36.53509673 18.27958367 -37.40372741 20.84482998 -38.2890625 23.640625 C-32.76602874 25.95109412 -27.67254319 25.97363923 -21.7890625 25.953125 C-20.40267578 25.97729492 -20.40267578 25.97729492 -18.98828125 26.00195312 C-13.6848894 26.00574668 -9.84304423 25.67907709 -5.2890625 22.640625 C-3.72476002 19.51202005 -3.93278966 17.08459575 -4.2890625 13.640625 C-8.08909521 9.62947936 -11.10541041 8.81531717 -16.4140625 8.390625 C-23.26079062 8.83234939 -30.5676504 10.34692052 -35.2890625 15.640625 Z "
                fill="#000000"
                transform="translate(255.2890625,4.359375)"
              />
              <path
                d="M0 0 C7.47063454 6.75914554 10.30532547 14.28539272 10.82763672 24.23510742 C10.93400404 27.99475421 10.95124495 31.75221284 10.94067383 35.51318359 C10.93750681 37.86993408 10.9610596 40.22543454 10.98632812 42.58203125 C11.01937299 50.2891228 10.96866158 57.26773831 7.625 64.375 C4.9375 65.9375 4.9375 65.9375 2.625 66.375 C1.24937146 65.08534824 -0.08266393 63.74810707 -1.375 62.375 C-1.375 61.715 -1.375 61.055 -1.375 60.375 C-2.11105469 60.65214844 -2.84710938 60.92929688 -3.60546875 61.21484375 C-5.06919922 61.75818359 -5.06919922 61.75818359 -6.5625 62.3125 C-8.00689453 62.85197266 -8.00689453 62.85197266 -9.48046875 63.40234375 C-20.12688346 66.97988392 -30.78432032 65.61042457 -40.8125 60.6875 C-46.68697779 55.386142 -49.03894667 49.82770665 -49.625 42.0625 C-49.1814553 35.52021568 -47.57408158 31.12711903 -42.75 26.5625 C-33.78743548 19.48934097 -23.38601155 19.29954433 -12.375 20.375 C-9.09881554 21.09386015 -6.45991258 22.02885633 -3.375 23.375 C-4.88287984 17.63770111 -5.9843844 13.5304823 -11.375 10.375 C-18.8800034 8.06697594 -25.35065392 8.98987623 -32.2734375 12.40234375 C-35.35709257 13.82953727 -37.98461401 14.375 -41.375 14.375 C-43.875 12.875 -43.875 12.875 -45.375 10.375 C-45.625 6.9375 -45.625 6.9375 -44.375 3.375 C-33.26399433 -7.85645017 -13.01366424 -6.26583834 0 0 Z M-33.8125 36.5625 C-35.83449 40.202082 -36.03500039 42.26833089 -35.375 46.375 C-33.2022578 49.00516161 -31.42826212 50.84836894 -28.375 52.375 C-19.10225714 53.08204664 -11.81557332 52.53035917 -3.375 48.375 C-3.375 44.085 -3.375 39.795 -3.375 35.375 C-19.21876143 30.80434283 -19.21876143 30.80434283 -33.8125 36.5625 Z "
                fill="#000000"
                transform="translate(255.375,113.625)"
              />
              <path
                d="M0 0 C5.16314337 4.49096056 9.35322477 10.13819589 10.27613831 17.07572937 C10.37759484 19.36705676 10.38995507 21.64018494 10.36328125 23.93359375 C10.36402901 25.18874535 10.36402901 25.18874535 10.36479187 26.46925354 C10.36246297 28.22993355 10.35280481 29.99061763 10.33618164 31.7512207 C10.31259916 34.42625146 10.31562886 37.10028225 10.32226562 39.77539062 C10.3166872 41.49479753 10.30957629 43.21420029 10.30078125 44.93359375 C10.30169266 45.72342148 10.30260406 46.51324921 10.30354309 47.32701111 C10.22735778 53.38227403 9.49608954 59.00782093 6.75 64.5 C5 66 5 66 1.8125 66.25 C0.884375 66.1675 -0.04375 66.085 -1 66 C-3.41671113 60.30232343 -4.43204932 55.78243769 -4.40625 49.625 C-4.41708618 48.85623535 -4.42792236 48.0874707 -4.43908691 47.29541016 C-4.48445642 44.04530401 -4.49636205 40.79528717 -4.51123047 37.54492188 C-4.52704408 35.15466987 -4.56006077 32.76505657 -4.59375 30.375 C-4.59072876 29.65393066 -4.58770752 28.93286133 -4.58459473 28.18994141 C-4.66195177 22.87788548 -5.83415904 18.86456848 -8 14 C-10.95453286 11.13499844 -13.76571072 10.72782806 -17.75 10.4375 C-23.61974783 10.62147717 -27.77999623 13.0098797 -32 17 C-35.52240909 21.51121352 -36.52365674 24.57477367 -36.72265625 30.26953125 C-36.75427353 30.94996994 -36.78589081 31.63040863 -36.81846619 32.33146667 C-36.91732529 34.49150649 -36.99214624 36.65135807 -37.0625 38.8125 C-37.83951519 60.83951519 -37.83951519 60.83951519 -43 66 C-45.4375 66.375 -45.4375 66.375 -48 66 C-51.76605648 62.36844554 -51.97120382 58.31310589 -52.08178711 53.27050781 C-52.06819117 51.83133001 -52.04978163 50.39219211 -52.02734375 48.953125 C-52.01469109 47.3697939 -52.0023306 45.78646045 -51.99023438 44.203125 C-51.96551684 41.73039227 -51.93760565 39.25778543 -51.90405273 36.78515625 C-51.77306984 26.47154254 -51.72953727 17.44974106 -55.75 7.75 C-57 4 -57 4 -56.5 1.125 C-54.53526402 -1.65837597 -53.35863796 -2.38933855 -50 -3 C-44.82752679 -1.31102916 -42.59825705 1.30315072 -40 6 C-40 6.66 -40 7.32 -40 8 C-39.319375 7.278125 -38.63875 6.55625 -37.9375 5.8125 C-27.53051979 -4.53568371 -13.15102538 -8.12269214 0 0 Z "
                fill="#000000"
                transform="translate(335,4)"
              />
              <path
                d="M0 0 C2.375 2 2.375 2 4.375 5 C4.18352432 8.06361086 3.79677804 10.27360449 2.25 12.9375 C-0.86440341 14.7023286 -3.22853963 13.79250742 -6.625 13 C-8.9646553 12.01488198 -11.29828135 11.01529541 -13.625 10 C-19.60390941 8.2727595 -25.93592447 9.15931305 -31.49609375 11.93359375 C-36.09989252 15.25154349 -37.63101018 19.64902148 -38.625 25 C-39.32802419 31.77637208 -39.28106355 39.041542 -35.625 45 C-31.43702923 49.04326447 -26.54901773 51.85144725 -20.6640625 52.16796875 C-15.18488744 51.71661908 -10.50198886 50.0373971 -6.4375 46.3125 C-3.625 44 -3.625 44 -0.5 43.375 C2.375 44 2.375 44 4.8125 46.125 C6.375 49 6.375 49 6.625 51.875 C4.15643359 58.04641603 -1.31198452 61.65694669 -7.1875 64.4375 C-16.5130788 67.75166724 -27.1435968 67.18981903 -36.1953125 63.30859375 C-44.85810863 58.64293989 -49.05600065 52.06451737 -52.625 43 C-55.69172317 31.36889138 -54.16696805 17.9867191 -48.234375 7.5546875 C-37.99700282 -7.04703808 -14.79291576 -9.3580489 0 0 Z "
                fill="#000000"
                transform="translate(182.625,5)"
              />
              <path
                d="M0 0 C1.5 2.875 1.5 2.875 2 6 C0.88483109 8.38964766 -0.13950458 10.13950458 -2 12 C-5.92425175 12.47856729 -8.20901078 12.00290312 -11.5 10 C-17.70965127 6.64989912 -25.66550612 6.71837224 -32.3515625 8.6953125 C-36.57399781 10.83348187 -38.3775603 13.67349414 -40 18 C-42.50625016 26.11883855 -41.94312354 35.52166225 -38 43 C-35.67930035 45.42416001 -35.67930035 45.42416001 -33 47 C-32.401875 47.391875 -31.80375 47.78375 -31.1875 48.1875 C-24.99172423 50.48878814 -20.19038504 50.27310342 -14.09375 48.0390625 C-11.98134801 46.9907436 -10.57436396 45.86801143 -8.875 44.25 C-6 42 -6 42 -2.25 42.0625 C1 43 1 43 3 45 C3.54780133 48.23202783 3.79629675 49.92061468 3 53 C-1.51090433 59.24490098 -8.65685244 62.41305379 -16 64 C-25.86801379 65.09020198 -35.02354141 64.16235649 -43.31640625 58.38671875 C-50.85341113 52.1267018 -55.27653669 44.79732683 -56.18896484 34.96337891 C-56.94307196 22.55736393 -55.82769839 11.69011763 -47.6953125 1.71875 C-35.30492524 -10.84293293 -13.85327565 -9.65087105 0 0 Z "
                fill="#000000"
                transform="translate(189,116)"
              />
            </svg>

            <div>
              <ul className="text-gray-600 text-sm justify-self-start">
                <li>주소: 서울 강남구 테헤란로 212 (06220)</li>
                <li>대표: 이주현, 전종우</li>
                <li>대표전화: 010-0000-0000</li>
                <li>이메일: scenescape_contact@scenescape.com</li>
              </ul>

              <div className="flex justify-between items-center text-gray-800">
                <p>ⓒ Copyright. 2024 SSAFY SCENESCAPE, Inc.</p>

                <div>
                  <a
                    className="mx-2"
                    href="#"
                  >
                    개인정보 처리방침
                  </a>
                  <a
                    className="mx-2"
                    href="#"
                  >
                    쿠키 정책
                  </a>
                  <a
                    className="mx-2"
                    href="#"
                  >
                    이용약관
                  </a>
                  <a
                    className="mx-2"
                    href="#"
                  >
                    사이트맵
                  </a>
                  <a
                    className="mx-2"
                    href="#"
                  >
                    한국의 변경된 환불 정책
                  </a>
                  <a
                    className="mx-2"
                    href="#"
                  >
                    회사 세부정보
                  </a>
                </div>

                <div className="flex justify-center items-center">
                  <div className="flex items-center mx-5">
                    <button>
                      <svg
                        className="w-5 h-5 mb-1 mx-1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                        />
                      </svg>
                    </button>

                    <a href="#">한국어(KR)</a>
                  </div>

                  <button>
                    <svg
                      className="w-5 h-5 mb-1 mx-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      aria-label="페이스북으로 이동하기"
                    >
                      <path d="M30 0a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"></path>
                      <path
                        fill="#fff"
                        d="M22.94 16H18.5v-3c0-1.27.62-2.5 2.6-2.5h2.02V6.56s-1.83-.31-3.58-.31c-3.65 0-6.04 2.21-6.04 6.22V16H9.44v4.62h4.06V32h5V20.62h3.73z"
                      ></path>
                    </svg>
                  </button>

                  <button>
                    <svg
                      className="w-5 h-5 mb-1 mx-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      aria-label="트위터로 이동하기"
                    >
                      <path d="M32 4v24a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4z"></path>
                      <path
                        fill="#fff"
                        d="M18.66 7.99a4.5 4.5 0 0 0-2.28 4.88A12.31 12.31 0 0 1 7.3 8.25a4.25 4.25 0 0 0 1.38 5.88c-.69 0-1.38-.13-2-.44a4.54 4.54 0 0 0 3.5 4.31 4.3 4.3 0 0 1-2 .06 4.64 4.64 0 0 0 4.19 3.13A8.33 8.33 0 0 1 5.8 23a12.44 12.44 0 0 0 19.32-11.19A7.72 7.72 0 0 0 27.3 9.5a8.3 8.3 0 0 1-2.5.75 4.7 4.7 0 0 0 2-2.5c-.87.5-1.81.87-2.81 1.06a4.5 4.5 0 0 0-5.34-.83z"
                      ></path>
                    </svg>
                  </button>

                  <button>
                    <svg
                      className="w-5 h-5 mb-1 mx-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      aria-label="인스타그램으로 이동하기"
                    >
                      <path d="M30 0H2a2 2 0 0 0-2 2v28c0 1.1.9 2 2 2h28a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
                      <path
                        fill="#fff"
                        d="M15.71 4h1.25c2.4 0 2.85.02 3.99.07 1.28.06 2.15.26 2.91.56.79.3 1.46.72 2.13 1.38.6.6 1.08 1.33 1.38 2.13l.02.06c.28.74.48 1.58.54 2.8l.01.4c.05 1.02.06 1.63.06 4.4v.92c0 2.6-.02 3.05-.07 4.23a8.78 8.78 0 0 1-.56 2.91c-.3.8-.77 1.53-1.38 2.13a5.88 5.88 0 0 1-2.13 1.38l-.06.02c-.74.28-1.59.48-2.8.53l-.4.02c-1.02.05-1.63.06-4.4.06h-.92a73.1 73.1 0 0 1-4.23-.07 8.78 8.78 0 0 1-2.91-.56c-.8-.3-1.53-.77-2.13-1.38a5.88 5.88 0 0 1-1.38-2.13l-.02-.06a8.84 8.84 0 0 1-.54-2.8l-.01-.37A84.75 84.75 0 0 1 4 16.29v-1c0-2.62.02-3.06.07-4.24.06-1.26.26-2.13.55-2.88l.01-.03c.3-.8.77-1.53 1.38-2.13a5.88 5.88 0 0 1 2.13-1.38l.06-.02a8.84 8.84 0 0 1 2.8-.54l.37-.01C12.39 4 12.99 4 15.71 4zm.91 2.16h-1.24c-2.3 0-2.91.01-3.81.05l-.42.02c-1.17.05-1.8.25-2.23.41-.56.22-.96.48-1.38.9-.4.41-.67.8-.88 1.35l-.03.06a6.7 6.7 0 0 0-.4 2.2l-.02.45c-.04.9-.05 1.53-.05 3.94v1.08c0 2.64.02 3.05.07 4.23v.07c.06 1.13.25 1.74.42 2.16.21.56.47.96.9 1.38.4.4.8.67 1.34.88l.06.03a6.7 6.7 0 0 0 2.2.4l.45.02c.9.04 1.53.05 3.94.05h1.08c2.64 0 3.05-.02 4.23-.07h.07a6.51 6.51 0 0 0 2.16-.42c.52-.19.99-.5 1.38-.9.4-.4.67-.8.88-1.34l.03-.06a6.7 6.7 0 0 0 .4-2.2l.02-.45c.04-.9.05-1.53.05-3.94v-1.09c0-2.63-.02-3.04-.07-4.22v-.07a6.51 6.51 0 0 0-.42-2.16c-.19-.52-.5-.99-.9-1.38a3.7 3.7 0 0 0-1.34-.88l-.06-.03a6.63 6.63 0 0 0-2.16-.4l-.46-.02c-.9-.04-1.5-.05-3.8-.05zM16 9.84a6.16 6.16 0 1 1 0 12.32 6.16 6.16 0 0 1 0-12.32zM16 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm6.4-3.85a1.44 1.44 0 1 1 0 2.88 1.44 1.44 0 0 1 0-2.88z"
                      ></path>
                    </svg>
                  </button>

                  <button>
                    <svg
                      className="w-5 h-5 mb-1 mx-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      aria-label="네이버 블로그로 이동하기"
                    >
                      <path
                        fill="#222"
                        d="M30 0a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"
                      ></path>
                      <path
                        fill="#fff"
                        d="M23.92 6A4.1 4.1 0 0 1 28 9.88l.01.2v9.84A4.08 4.08 0 0 1 24.13 24h-5.86l-1.91 3.31a.45.45 0 0 1-.73.08l-.05-.08-1.91-3.3h-5.6a4.08 4.08 0 0 1-4.06-3.87l-.01-.2v-9.86a4.08 4.08 0 0 1 3.87-4.06l.2-.01zm-1.99 7.22c-1.13 0-2.05.95-2.05 2.12 0 1.16.92 2.1 2.05 2.1.47 0 .9-.15 1.24-.42v.59l-.03.08-.05.1c-.11.16-.36.39-.9.39v1.09h.22c.3-.02.87-.13 1.42-.61l.13-.13.05-.06.1-.12c.11-.17.26-.44.31-.76v-4.28h-1.25v.34a2.02 2.02 0 0 0-1.24-.43zM8.81 11.9H7.58v5.6H8.8v-.4c.35.3.79.5 1.27.5 1.1 0 2-.98 2-2.19s-.89-2.2-2-2.2c-.42 0-.81.15-1.14.4l-.13.1zm8.3 1.31c-1.23 0-2.23.98-2.23 2.2s1 2.18 2.23 2.18c1.22 0 2.22-.98 2.22-2.19s-1-2.19-2.22-2.19zm-3.35-.66a1.98 1.98 0 0 0-1.33-.75H12.22v1.12l.08.01c.14.04.44.16.56.5l.04.12v3.94h1.27v-3.97a2.12 2.12 0 0 0-.24-.7l-.08-.15zM9.84 14.3a1.1 1.1 0 1 1 0 2.19 1.1 1.1 0 0 1-1.12-1.1c0-.15.04-.3.1-.43.17-.4.56-.66 1.02-.66zm7.27.05c.58 0 1.06.47 1.06 1.04s-.47 1.05-1.06 1.05c-.6 0-1.07-.47-1.07-1.05s.48-1.04 1.07-1.04zm5.05-.11c.44 0 .83.24 1.01.6.08.15.12.3.12.48s-.05.34-.12.48c-.18.36-.57.6-1 .6a1.1 1.1 0 0 1-1.13-1.08c0-.6.5-1.08 1.12-1.08z"
                      ></path>
                    </svg>
                  </button>

                  <button>
                    <svg
                      className="w-5 h-5 mb-1 mx-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      aria-label="네이버 포스트로 이동하기"
                    >
                      <path
                        fill="#222"
                        d="M30 0a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"
                      ></path>
                      <path
                        fill="#fff"
                        d="M10 0h12.81v16.78l-5.88 10.13a.6.6 0 0 1-.99.09l-.06-.1L10 16.79z"
                      ></path>
                      <path
                        fill="#222"
                        d="M12.66 4.64v7.5h7.5v-7.5zm5.87 5.69h-1.5l-1.28-1.96v1.96h-1.47V6.45h1.43l1.32 1.95V6.45h1.5z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;